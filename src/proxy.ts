import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/server/session';

const publicRoutes = ['/', '/sign-in', '/sign-up'];

// Routes that are allowed only for unauthorized users
const authRoutes = ['/sign-in', '/sign-up'];

export async function proxy(req: NextRequest) {
  const currentPath: string = req.nextUrl.pathname;

  // Check whether the current route is protected.
  // Redirect users without valid session to sign-in page
  if (!publicRoutes.includes(currentPath)) {
    const session = await getSession();
    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
    }

    // Render protected route
    return NextResponse.next();
  }

  // Check whether the user is on the authentication pages.
  // If they are already authorised, redirect them to the dashboard page.
  if (authRoutes.includes(currentPath)) {
    const session = await getSession();
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
