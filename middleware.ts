import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "@/serverActions/serverCookieUtils";

export async function middleware(req: NextRequest) {
  const token = await getToken(req);
  console.log(token);

  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Define the paths where the middleware should run
export const config = {
  matcher: ["/app/:path*", "/app"],
};
