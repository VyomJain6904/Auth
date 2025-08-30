import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return; // Avoid returning null; this is equivalent to returning void
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(
                new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
            );
        }
        return; // Equivalent to returning void
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callBackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callBackUrl += nextUrl.search;
        }

        const encodedCallBackUrl = encodeURIComponent(callBackUrl);

        return NextResponse.redirect(
            new URL(`/login?callbackUrl=${encodedCallBackUrl}`, nextUrl)
        );
    }

    return; // Return void by default
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
