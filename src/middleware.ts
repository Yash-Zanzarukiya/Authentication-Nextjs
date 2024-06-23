import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const publicPath = ["/login", "/signup", "/verifyemail"];

  const currentPath = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value || "";

  if (publicPath.includes(currentPath) && token)
    return NextResponse.redirect(new URL("/", request.url));
  else if (!publicPath.includes(currentPath) && !token)
    return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/", "/login", "/signup", "/verifyemail", "/profile"],
};
