// middleware.ts
import { auth } from "./auth"; // তুমি যেই auth ফাংশন দিয়েছো
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // public paths যেগুলো কারো লগইন ছাড়াই যাবে
  const publicPaths = ["/", "/login", "/register"];

  // যদি public path হয়, তাহলে ফাঁকাই দিয়ে দাও
  if (
    publicPaths.some(
      (path) => pathname === path || pathname.startsWith(path + "/")
    ) ||
    pathname.startsWith("/api") ||      // api রুট পাস
    pathname.startsWith("/_next") ||    // next.js স্ট্যাটিক ফাইল পাস
    pathname === "/favicon.ico"         // favicon পাস
  ) {
    return NextResponse.next();
  }

  try {
    // auth() কল করে session নাও
    const session = await auth();

    // session থেকে accessToken বা token নাও
    const token = session?.user?.accessToken || session?.accessToken || null;

    // প্রটেক্টেড পাথ গুলোতে যদি টোকেন না থাকে তাহলে লগইন পেজে রিডাইরেক্ট
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/tests") ||
      pathname.startsWith("/certificates")
    ) {
      if (!token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware token error:", error);
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/tests/:path*",
    "/certificates/:path*",
  ],
};
