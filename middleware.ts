import NextAuth from 'next-auth';
import authConfig from './auth.config';
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  loginRedirect,
} from '@/routes';

export const { auth } = NextAuth(authConfig);

export default auth(async req => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth; // Check if user is logged in (token exists)

  // Define if the route is public
  const isRootRoute = nextUrl.pathname === '/';
  const isPublicRoute = isRootRoute
    ? publicRoutes.includes('/')
    : publicRoutes.some(
        route => nextUrl.pathname.startsWith(route) && route !== '/'
      );

  // Check if the route is for API authentication
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Check if it's a route that requires authentication
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Handling API routes (no special handling needed here but just logs the request)
  if (isApiAuthRoute) {
    console.log('API request', req);
    return;
  }

  // Handling authentication routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(loginRedirect, nextUrl)); // Redirect logged-in users
    }
    return;
  }

  // Redirect non-logged-in users to login for private routes
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl)); // Redirect to login
  }

  return;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
