import { getCollection } from "astro:content";
import { getGithubRepo } from "./github";

export type OpenSourceItem = {
  id: string;
  url: string;
  title: string;
  description: string;
  stars: number | null;
  /** Repository creation date, used to place it in the archives. */
  createdAt: Date | null;
  tags: string[];
};

/**
 * Open source entries with GitHub data merged in, most-starred first. The
 * repository's name, description and stars are shown as-is; only `title` can
 * be overridden in the entry file.
 */
export async function getOpenSourceItems(): Promise<OpenSourceItem[]> {
  const entries = await getCollection("openSource");

  const items = await Promise.all(
    entries.map(async ({ id, data }) => {
      const repo = await getGithubRepo(data.repo);
      return {
        id,
        url: repo.url,
        title: data.title ?? repo.name,
        description: repo.description ?? "",
        stars: repo.stars,
        createdAt: repo.createdAt,
        tags: data.tags,
      };
    })
  );

  return items.sort(
    (a, b) =>
      (b.stars ?? -1) - (a.stars ?? -1) || a.title.localeCompare(b.title)
  );
}
