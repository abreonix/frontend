import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";

  // 1️⃣ Ignore ALL public files + Next.js static files
  // Anything with a file extension OR inside /_next
  const isPublicAsset =
    url.pathname.startsWith("/_next") ||
    url.pathname.match(/\.[a-zA-Z0-9]+$/); // .png, .jpg, .ico, .css, .js, .svg, .pdf, etc.

  if (isPublicAsset) {
    return NextResponse.next();
  }

  // 2️⃣ Rewrite for your subdomain
  if (host.startsWith("teameklavya.")) {
    url.pathname = "/teameklavya";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
