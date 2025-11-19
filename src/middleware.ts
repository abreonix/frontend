import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";

  // Subdomain check
  if (host.startsWith("teameklavya.")) {
    return NextResponse.rewrite(new URL("/teameklavya", req.url));
  }

  return NextResponse.next();
}
