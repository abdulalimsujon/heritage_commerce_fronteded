import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { getCurrentUser } from "./services/authService";

const authRoutes = ["/login", "/registration"];

type TRole = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  admin: [/^\/admin/],
  user: [/^\/user/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname; // Corrected to use pathname
  const user = await getCurrentUser();

  if (!user) {
    // Redirect unauthenticated users to login if accessing other routes
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  } else {
    // If authenticated, prevent access to auth routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Check if the user's role allows access to the requested route
  if (user.role && roleBasedRoutes[user.role as TRole]) {
    const routes = roleBasedRoutes[user.role as TRole];

    // Allow access if any route matches the pathname
    if (routes.some((route) => route.test(pathname))) {
      return NextResponse.next();
    }
  }

  // Redirect to the home page if the user doesn't have permission for the route
  return NextResponse.redirect(new URL("/", request.url));
}

// Matching paths configuration
export const config = {
  matcher: ["/admin/product-management", "/admin/user-management"],
};
