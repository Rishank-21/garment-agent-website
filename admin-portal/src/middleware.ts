import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "himat_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow requests to /login and api/auth endpoints without auth check
  if (
    pathname === "/login" ||
    pathname.startsWith("/api/auth") ||
    pathname.includes("_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(COOKIE_NAME)?.value;

  if (!sessionToken) {
    console.log("[Middleware] No session cookie. Redirecting to /login");
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const cookieSecret = process.env.COOKIE_SECRET || "himat-secret-cookie-2026-key-9812";
    const secretKey = new TextEncoder().encode(cookieSecret);
    await jwtVerify(sessionToken, secretKey, {
      algorithms: ["HS256"],
    });

    // Valid token. Allow request to proceed.
    return NextResponse.next();
  } catch (error) {
    console.warn("[Middleware] JWT verification failed:", String(error));
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/public (public APIs if any)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/public|_next/static|_next/image|favicon.ico).*)",
  ],
};
