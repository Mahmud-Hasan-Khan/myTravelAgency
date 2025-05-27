import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    const isAuthPage = pathname === "/login";

    // 1. Redirect unauthenticated users trying to access protected pages
    if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
        return NextResponse.redirect(new URL("/login", req.URL));
    }

    // 2. Redirect authenticated users away from login page
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // 3. Block non-admins from accessing admin routes
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
};