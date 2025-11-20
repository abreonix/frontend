import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // 1️⃣ Ignore ALL public files + Next.js static files + sitemap.xml
  const isPublicAsset =
    url.pathname.startsWith("/_next") ||
    url.pathname.match(/\.[a-zA-Z0-9]+$/); // .png, .jpg, .ico, .css, .js, .svg, etc.

  if (isPublicAsset) {
    return NextResponse.next();
  }

  // 2️⃣ Rewrite for your subdomain
  if (host.startsWith("teameklavya.")) {
    // Keep the original path after the subdomain
    url.pathname = `/teameklavya${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// 3️⃣ Match all routes except Next.js static files
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
