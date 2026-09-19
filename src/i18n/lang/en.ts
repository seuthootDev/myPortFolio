import type { UIStrings } from "../types";

export default {
  nav: {
    home: "Home",
    posts: "Posts",
    tags: "Tags",
    about: "About",
    archives: "Archives",
    search: "Search",
  },
  post: {
    publishedAt: "Published at",
    updatedAt: "Updated",
    present: "Present",
    sharePostIntro: "Share this post:",
    sharePostOn: "Share this post on {{platform}}",
    sharePostViaEmail: "Share this post via email",
    tagLabel: "Tags",
    backToTop: "Back to top",
    goBack: "Go back",
    editPage: "Edit page",
    previousPost: "Previous Post",
    nextPost: "Next Post",
  },
  pagination: {
    prev: "Prev",
    next: "Next",
    page: "Page",
  },
  home: {
    greeting: "Hello",
    intro:
      "I'm Seunghoon Jung, a software developer building manufacturing digital twin tools and full-stack web apps. With a background in mathematics, I work across desktop (PySide6/QML, QtQuick3D), web (Next.js, NestJS, FastAPI) and 3D visualization (VTK).",
    explore: "Take a look at my work:",
    socialLinks: "Social Links",
    featured: "Featured",
    recentPosts: "Recent Posts",
    allPosts: "All Posts",
    recentPrefix: "Recent",
    allPrefix: "All",
    empty: "Nothing here yet.",
  },
  categories: {
    projects: {
      label: "Projects",
      desc: "Things I built at work.",
    },
    "open-source": {
      label: "Open Source",
      desc: "Open source projects I build and maintain.",
    },
  },
  openSource: {
    stars: "GitHub stars",
  },
  about: {
    photoAlt: "Photo of Seunghoon Jung",
  },
  portfolio: {
    name: "Seunghoon Jung",
    title: "Portfolio PDF",
    desc: "Choose what to include, then save the page as a PDF.",
    include: "Include",
    intro: "Intro & links",
    images: "Main images",
    details: "Project details (after the overview)",
    preparing: "Preparing GIF scenes…",
    gifNote: "The original is a GIF. See it in motion on the web.",
    reset: "Reset to default",
    save: "Save as PDF",
    nothing: "Nothing selected.",
    note: "Links stay clickable in the PDF. Videos show their poster image and GIFs their first frame.",
    resume: "Resume",
    website: "Portfolio",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "All rights reserved.",
  },
  pages: {
    tagTitle: "Tag",
    tagDesc: "All the articles with the tag",

    tagsTitle: "Tags",
    tagsDesc: "All the tags used in posts.",

    postsTitle: "Posts",
    postsDesc: "All the articles I've posted.",

    archivesTitle: "Archives",
    archivesDesc: "All the articles I've archived.",

    searchTitle: "Search",
    searchDesc: "Search any article ...",
  },
  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Toggle theme",
    switchLanguage: "Switch language",
    searchPlaceholder: "Search posts...",
    noResults: "No results found",
    goToPreviousPage: "Go to previous page",
    goToNextPage: "Go to next page",
  },
  notFound: {
    title: "404 Not Found",
    message: "Page Not Found",
    goHome: "Go back home",
  },
} satisfies UIStrings;
