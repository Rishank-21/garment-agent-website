import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const COOKIE_NAME = "himat_session";
const ONE_YEAR_S = 365 * 24 * 60 * 60; // 1 year in seconds

export async function POST(req: Request) {
  try {
    const { passkey } = (await req.json()) as { passkey: string };

    const expectedPasskey = process.env.ADMIN_PASSKEY || "HimatAdmin2026";

    if (passkey !== expectedPasskey) {
      return new NextResponse("Invalid passkey", { status: 401 });
    }

    const cookieSecret = process.env.COOKIE_SECRET || "himat-secret-cookie-2026-key-9812";
    const secretKey = new TextEncoder().encode(cookieSecret);

    const expirationSeconds = Math.floor(Date.now() / 1000) + ONE_YEAR_S;

    // Create session token JWT
    const sessionToken = await new SignJWT({
      openId: "admin-id",
      appId: "himat-textile-app",
      name: "Himat Admin",
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(expirationSeconds)
      .sign(secretKey);

    const response = NextResponse.json({ success: true });
    
    // Set http-only session cookie
    response.cookies.set(COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ONE_YEAR_S,
    });

    return response;
  } catch (error) {
    console.error("[API/Auth/Login] Login error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
