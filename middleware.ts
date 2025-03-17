// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Don't redirect the auth pages
    if (req.nextUrl.pathname === "/admin") {
      return NextResponse.next();
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to the login page
        if (req.nextUrl.pathname === "/admin") {
          return true;
        }
        // Require authentication for other admin routes
        return !!token;
      },
    },
  }
);

// Only apply to admin routes except the login page
export const config = { matcher: ["/admin/dashboard/:path*", "/admin/edit/:path*"] };