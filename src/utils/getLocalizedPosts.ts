import { getCollection, type CollectionEntry } from "astro:content";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./locales";

type Post = CollectionEntry<"posts">;

/**
 * Posts live in one folder per locale: `src/content/posts/<locale>/...`, so an
 * id looks like `en/my-post` or `ko/my-post`. The first segment is the locale.
 */
export const getPostLocale = (post: Post): Locale | undefined => {
  const first = post.id.split("/")[0];
  return isLocale(first) ? first : undefined;
};

/** The id without its locale prefix; identical for translations of one post. */
const getBaseId = (post: Post) => post.id.split("/").slice(1).join("/");

/**
 * Posts to show for a locale. Non-default locales list their own posts, plus
 * the default-locale version of any post that has no translation yet, so the
 * site never appears empty.
 */
export async function getLocalizedPosts(
  locale: Locale,
  filter?: (post: Post) => boolean
): Promise<Post[]> {
  const all = await getCollection("posts", filter);
  const own = all.filter(post => getPostLocale(post) === locale);
  if (locale === DEFAULT_LOCALE) return own;

  const translated = new Set(own.map(getBaseId));
  const fallback = all.filter(
    post =>
      getPostLocale(post) === DEFAULT_LOCALE && !translated.has(getBaseId(post))
  );
  return [...own, ...fallback];
}
