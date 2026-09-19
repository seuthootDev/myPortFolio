import type { UIStrings } from "../types";

export default {
  nav: {
    home: "홈",
    posts: "글",
    tags: "태그",
    about: "소개",
    archives: "아카이브",
    search: "검색",
  },
  post: {
    publishedAt: "작성일",
    updatedAt: "수정일",
    present: "현재",
    sharePostIntro: "이 글 공유하기:",
    sharePostOn: "{{platform}}에 공유하기",
    sharePostViaEmail: "이메일로 공유하기",
    tagLabel: "태그",
    backToTop: "맨 위로",
    goBack: "뒤로 가기",
    editPage: "페이지 수정",
    previousPost: "이전 글",
    nextPost: "다음 글",
  },
  pagination: {
    prev: "이전",
    next: "다음",
    page: "페이지",
  },
  home: {
    greeting: "안녕하세요",
    intro:
      "정승훈입니다. 제조 디지털 트윈 도구와 풀스택 웹 애플리케이션을 만드는 소프트웨어 개발자입니다. 수학을 전공했고, 데스크톱(PySide6/QML, QtQuick3D)부터 웹(Next.js, NestJS, FastAPI), 3D 시각화(VTK)까지 폭넓게 다룹니다.",
    explore: "작업 둘러보기:",
    socialLinks: "소셜 링크",
    featured: "추천",
    recentPosts: "최근 글",
    allPosts: "전체 글",
    recentPrefix: "최근",
    allPrefix: "전체",
    empty: "아직 내용이 없습니다.",
  },
  categories: {
    projects: {
      label: "프로젝트",
      desc: "회사에서 만든 작업들입니다.",
    },
    "open-source": {
      label: "오픈소스",
      desc: "직접 만들고 운영하는 오픈소스 프로젝트입니다.",
    },
  },
  openSource: {
    stars: "GitHub 스타",
  },
  about: {
    photoAlt: "정승훈 프로필 사진",
  },
  portfolio: {
    name: "정승훈",
    title: "포트폴리오 PDF",
    desc: "포함할 항목을 고른 뒤 PDF로 저장하세요.",
    include: "포함할 항목",
    intro: "소개 및 링크",
    images: "대표 이미지",
    details: "프로젝트 상세 (개요 뒤에 추가)",
    preparing: "GIF 장면을 준비하는 중…",
    gifNote: "원본은 GIF입니다. 웹에서 더 잘 확인할 수 있습니다.",
    reset: "기본값으로",
    save: "PDF로 저장",
    nothing: "선택된 항목이 없습니다.",
    note: "링크는 PDF에서도 클릭됩니다. 영상은 대표 이미지로, GIF는 첫 화면으로 들어갑니다.",
    resume: "이력서",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "모든 권리 보유.",
  },
  pages: {
    tagTitle: "태그",
    tagDesc: "다음 태그가 달린 모든 글",

    tagsTitle: "태그",
    tagsDesc: "글에 사용된 모든 태그입니다.",

    postsTitle: "전체 글",
    postsDesc: "작성한 모든 글입니다.",

    archivesTitle: "아카이브",
    archivesDesc: "보관된 모든 글입니다.",

    searchTitle: "검색",
    searchDesc: "글을 검색해 보세요 ...",
  },
  a11y: {
    skipToContent: "본문으로 건너뛰기",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    toggleTheme: "테마 전환",
    switchLanguage: "언어 전환",
    searchPlaceholder: "글 검색...",
    noResults: "검색 결과가 없습니다",
    goToPreviousPage: "이전 페이지로 이동",
    goToNextPage: "다음 페이지로 이동",
  },
  notFound: {
    title: "404 찾을 수 없음",
    message: "페이지를 찾을 수 없습니다",
    goHome: "홈으로 돌아가기",
  },
} satisfies UIStrings;
