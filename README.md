# Seunghoon Jung — Portfolio

Bilingual (English / 한국어) portfolio of Seunghoon Jung, a software developer building manufacturing digital twin tools and full-stack web apps. Built with [Astro](https://astro.build/) on top of the [AstroPaper](https://github.com/satnaing/astro-paper) theme.

## What's in it

- **Projects** — write-ups as Markdown, with a period, a company and a main image. Previews show the date range instead of a publish date.
- **Open Source** — repositories listed by GitHub URL. The name, description, star count and creation date are fetched from the GitHub API at build time; cards link straight to GitHub.
- **Archives** — projects (by start month) and repositories (by creation date) on one timeline.
- **Tags** — shared by projects and repositories, so one tag page lists both.
- **Two languages** — English by default, Korean under `/ko/`, with a switcher in the header. Untranslated posts fall back to English.
- **Dark / light** theme.
- **Portfolio PDF builder** at `/portfolio/` (not linked, `noindex`) — tick the projects and repositories to include, then save the page as a PDF: an overview followed by each project's full write-up. GIFs become three stills.

## Getting started

Requires Node.js 22.12 or newer.

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # type check, build, then the Pagefind index
pnpm lint
pnpm format:check
```

`npm` works too if you prefer it.

## Adding content

**A project** — one file per language, same filename in both folders:

```
src/content/posts/en/<slug>.md
src/content/posts/ko/<slug>.md
```

```yaml
---
title: "…"
pubDatetime: 2025-10-31T09:00:00+09:00
period: { start: 2023-08, end: 2025-10 } # omit `end` if ongoing
company: Company Name
mainImage: https://… # used in the PDF; falls back to `ogImage`
tags: [python, vtk] # use the same tags in both languages
description: "…"
---
```

**An open source project** — one JSON file:

```json
// src/content/open-source/<name>.json
{
  "repo": "https://github.com/owner/name",
  "tags": ["cli"]
}
```

**Pages and UI text** — `src/content/pages/{en,ko}/about.md` for About; `src/i18n/lang/` for menu and button text.

## Configuration

Site name, description and social links live in `astro-paper.config.ts`.

- **`site.url`** must be set to the deployed address (it is used for canonical links, the sitemap, share images and the PDF's links).
- The GitHub API allows 60 unauthenticated requests per hour per IP. If builds hit the limit, provide a `GITHUB_TOKEN` environment variable; the build reads it automatically.

## Credits

This site started from **[AstroPaper](https://github.com/satnaing/astro-paper)** by [Sat Naing](https://satnaing.dev), released under the MIT License. The original copyright notice is kept in [`LICENSE`](LICENSE).

- Fonts: [Google Sans Code](https://fonts.google.com/specimen/Google+Sans+Code) (via Google Fonts); [Monoplex KR](https://github.com/y-kim/monoplex) by Kim Yangsu for Korean pages, under the SIL Open Font License 1.1 — the license text is in [`src/assets/fonts/LICENSE-Monoplex.md`](src/assets/fonts/LICENSE-Monoplex.md).
- Icons: [Tabler Icons](https://tabler.io/icons) (MIT).
- Built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/).

## License

MIT — see [`LICENSE`](LICENSE).
