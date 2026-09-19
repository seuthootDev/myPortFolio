import type { PaginateFunction } from "astro";
import type { CollectionEntry } from "astro:content";
import { getLocalizedPosts } from "@/utils/getLocalizedPosts";
import {
  getOpenSourceItems,
  type OpenSourceItem,
} from "@/utils/getOpenSourceItems";
import { getPostSlug } from "@/utils/getPostPaths";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getUniqueTags } from "@/utils/getUniqueTags";
import { slugifyAll } from "@/utils/slugify";
import type { CategoryId } from "@/utils/categories";
import type { Locale } from "@/utils/locales";
import config from "@/config";

// Shared `getStaticPaths` logic. Each locale has its own route files
// (`src/pages/...` for English, `src/pages/ko/...` for Korean) that call these
// with their locale, so posts of other locales never leak into a route.

const listPosts = (locale: Locale) =>
  getLocalizedPosts(locale, ({ data }) => !data.draft);

/** Paginated list of all posts. */
export async function paginatePosts(
  paginate: PaginateFunction,
  locale: Locale
) {
  const posts = await listPosts(locale);
  return paginate(getSortedPosts(posts), { pageSize: config.posts.perPage });
}

/** Paginated list of one category's posts. */
export async function paginateCategory(
  paginate: PaginateFunction,
  id: CategoryId,
  locale: Locale
) {
  const posts = await listPosts(locale);
  return paginate(
    getSortedPosts(posts.filter(({ data }) => data.category === id)),
    { pageSize: config.posts.perPage }
  );
}

/** An item on a tag page: a post, or an open source repository. */
export type TagEntry =
  | { kind: "post"; post: CollectionEntry<"posts"> }
  | { kind: "repo"; repo: OpenSourceItem };

/**
 * Paginated lists, one set per tag. Posts and open source repositories that
 * share a tag are listed together, newest first (a post by its last update,
 * a repository by when it was created).
 */
export async function paginateTags(paginate: PaginateFunction, locale: Locale) {
  const [posts, repos] = await Promise.all([
    listPosts(locale),
    getOpenSourceItems(),
  ]);

  return getUniqueTags(
    posts,
    repos.flatMap(repo => repo.tags)
  ).flatMap(({ tag, tagName }) => {
    const entries = [
      ...posts
        .filter(({ data }) => slugifyAll(data.tags).includes(tag))
        .map(post => ({
          entry: { kind: "post", post } as TagEntry,
          time: new Date(
            post.data.modDatetime ?? post.data.pubDatetime
          ).getTime(),
        })),
      ...repos
        .filter(repo => slugifyAll(repo.tags).includes(tag))
        .map(repo => ({
          entry: { kind: "repo", repo } as TagEntry,
          time: repo.createdAt?.getTime() ?? 0,
        })),
    ]
      .sort((a, b) => b.time - a.time)
      .map(({ entry }) => entry);

    return paginate(entries, {
      params: { tag },
      props: { tagName },
      pageSize: config.posts.perPage,
    });
  });
}

/** One static path per post, with links to the older/newer neighbours. */
export async function getPostPaths(locale: Locale) {
  const sortedPosts = getSortedPosts(await getLocalizedPosts(locale));

  return sortedPosts.map((post, index) => ({
    params: { slug: getPostSlug(post.id, post.filePath) },
    props: {
      post,
      // sortedPosts is newest-first, so "older" (prev) is a higher index
      // and "newer" (next) is a lower index.
      prevPost:
        index < sortedPosts.length - 1
          ? {
              id: sortedPosts[index + 1].id,
              title: sortedPosts[index + 1].data.title,
              filePath: sortedPosts[index + 1].filePath,
            }
          : null,
      nextPost:
        index > 0
          ? {
              id: sortedPosts[index - 1].id,
              title: sortedPosts[index - 1].data.title,
              filePath: sortedPosts[index - 1].filePath,
            }
          : null,
    },
  }));
}

/** Posts that get a generated OG image (no custom `ogImage`, not a draft). */
export async function getOgImagePaths(locale: Locale) {
  if (!config.features.dynamicOgImage) return [];

  const posts = await getLocalizedPosts(
    locale,
    ({ data }) => !data.draft && !data.ogImage
  );
  return posts.map(post => ({
    params: { slug: getPostSlug(post.id, post.filePath) },
    props: post,
  }));
}
