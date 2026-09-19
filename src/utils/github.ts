export type GithubRepo = {
  /** Canonical repository URL (what the card links to). */
  url: string;
  name: string;
  description: string | null;
  /** `null` when GitHub couldn't be reached or the repo wasn't found. */
  stars: number | null;
  /** When the repository was created; `null` under the same conditions. */
  createdAt: Date | null;
};

const CACHE_TTL = 10 * 60 * 1000;
const cache = new Map<string, { at: number; repo: Promise<GithubRepo> }>();

/** Extracts `owner`/`name` from a `https://github.com/owner/name` URL. */
export function parseRepoUrl(repoUrl: string) {
  const [owner, rawName] = new URL(repoUrl).pathname.split("/").filter(Boolean);
  if (!owner || !rawName) return null;
  return { owner, name: rawName.replace(/\.git$/, "") };
}

async function fetchRepo(repoUrl: string): Promise<GithubRepo> {
  const parsed = parseRepoUrl(repoUrl);
  if (!parsed) throw new Error(`Not a repository URL: ${repoUrl}`);
  const { owner, name } = parsed;

  const fallback: GithubRepo = {
    url: `https://github.com/${owner}/${name}`,
    name,
    description: null,
    stars: null,
    createdAt: null,
  };

  // Unauthenticated requests are limited to 60/hour per IP. Set GITHUB_TOKEN
  // (e.g. in CI) to raise that limit.
  const token = import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-site",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      // Build-time notice that a repo's data couldn't be fetched.
      // eslint-disable-next-line no-console
      console.warn(`[github] ${owner}/${name}: HTTP ${res.status}`);
      return fallback;
    }
    const data = await res.json();
    return {
      url: data.html_url ?? fallback.url,
      name: data.name ?? name,
      description: data.description ?? null,
      stars:
        typeof data.stargazers_count === "number"
          ? data.stargazers_count
          : null,
      createdAt: data.created_at ? new Date(data.created_at) : null,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`[github] ${owner}/${name}: ${(error as Error).message}`);
    return fallback;
  }
}

/** Repository info from the GitHub API. Never throws; results are cached. */
export function getGithubRepo(repoUrl: string): Promise<GithubRepo> {
  const cached = cache.get(repoUrl);
  if (cached && Date.now() - cached.at < CACHE_TTL) return cached.repo;

  const repo = fetchRepo(repoUrl);
  cache.set(repoUrl, { at: Date.now(), repo });
  return repo;
}
