import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const isAuthPage = req.nextUrl.pathname === "/login";
    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/login", req.URL));
    }
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};