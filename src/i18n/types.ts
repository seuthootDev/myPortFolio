export interface CategoryStrings {
  label: string;
  desc: string;
}

export interface UIStrings {
  nav: {
    home: string;
    posts: string;
    tags: string;
    about: string;
    archives: string;
    search: string;
  };
  post: {
    publishedAt: string;
    updatedAt: string;
    present: string;
    sharePostIntro: string;
    sharePostOn: string;
    sharePostViaEmail: string;
    tagLabel: string;
    backToTop: string;
    goBack: string;
    editPage: string;
    previousPost: string;
    nextPost: string;
  };
  pagination: {
    prev: string;
    next: string;
    page: string;
  };
  home: {
    greeting: string;
    intro: string;
    explore: string;
    socialLinks: string;
    featured: string;
    recentPosts: string;
    allPosts: string;
    recentPrefix: string;
    allPrefix: string;
    empty: string;
  };
  categories: Record<"projects" | "open-source", CategoryStrings>;
  openSource: {
    stars: string;
  };
  about: {
    photoAlt: string;
  };
  portfolio: {
    name: string;
    title: string;
    desc: string;
    include: string;
    intro: string;
    images: string;
    details: string;
    preparing: string;
    gifNote: string;
    reset: string;
    save: string;
    nothing: string;
    note: string;
    resume: string;
  };
  footer: {
    copyright: string;
    allRightsReserved: string;
  };
  pages: {
    tagTitle: string;
    tagDesc: string;

    tagsTitle: string;
    tagsDesc: string;

    postsTitle: string;
    postsDesc: string;

    archivesTitle: string;
    archivesDesc: string;

    searchTitle: string;
    searchDesc: string;
  };
  a11y: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    toggleTheme: string;
    switchLanguage: string;
    searchPlaceholder: string;
    noResults: string;
    goToPreviousPage: string;
    goToNextPage: string;
  };
  notFound: {
    title: string;
    message: string;
    goHome: string;
  };
}
