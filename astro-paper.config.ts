import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://my-port-folio-tau-ashy.vercel.app/",
    title: "Seunghoon Jung",
    description:
      "Portfolio of Seunghoon Jung, a software developer building manufacturing digital twin tools and full-stack web apps.",
    author: "Seunghoon Jung",
    profile: "https://github.com/seuthootDev",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Seoul",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: false,
  },
  socials: [
    { name: "github",   url: "https://github.com/seuthootDev" },
    { name: "x",        url: "https://x.com/Seuthoot" },
    { name: "linkedin", url: "https://www.linkedin.com/in/seunghoon-jung-38b270335/" },
    { name: "mail",     url: "mailto:seuthootdev@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});