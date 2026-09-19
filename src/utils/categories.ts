export const CATEGORY_IDS = ["projects", "open-source"] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

// Labels and descriptions live in the i18n strings (`t.categories[id]`).
// `kind` says where a category's entries come from: blog-style posts with a
// detail page, or GitHub repositories that link straight out to GitHub.
const META: Record<
  CategoryId,
  { kind: "posts" | "repos"; showRecentHeading: boolean }
> = {
  projects: { kind: "posts", showRecentHeading: true },
  "open-source": { kind: "repos", showRecentHeading: false },
};

export const CATEGORIES = CATEGORY_IDS.map(id => ({ id, ...META[id] }));

export const isCategoryId = (value: string): value is CategoryId =>
  (CATEGORY_IDS as readonly string[]).includes(value);
