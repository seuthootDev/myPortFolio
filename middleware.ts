// Vercel Edge Middleware: sends first-time visitors from Korea to the /ko/
// version of the site. Skipped entirely once a `lang` cookie exists, so a
// visitor's own choice (via the header language switch) always wins over
// geo-detection on later visits.
export const config = {
  matcher: [
    "/((?!ko(?:/|$)|_astro/|pagefind/|api/|favicon\\.svg|robots\\.txt|rss\\.xml|sitemap|og\\.png).*)",
  ],
};

export default function middleware(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  if (/(?:^|;\s*)lang=/.test(cookieHeader)) return;

  const country = request.headers.get("x-vercel-ip-country");
  if (country !== "KR") return;

  const url = new URL(request.url);
  url.pathname = `/ko${url.pathname}`;

  return new Response(null, {
    status: 307,
    headers: {
      Location: url.toString(),
      "Set-Cookie": "lang=ko; Path=/; Max-Age=31536000; SameSite=Lax",
    },
  });
}
