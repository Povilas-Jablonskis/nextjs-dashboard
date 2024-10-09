import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

export default withAuth(
  function middleware(req) {
    const isLoggedIn = !!req.nextauth.token;
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    if (!isOnDashboard && isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  },
  {
    ...authConfig,
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
  }
);

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
