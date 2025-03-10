import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const hostname = req.headers.get('host') || '';
  const mainDomain = 'ukbridge.club';
  let subdomain = null;

  // ✅ Allow static assets (CSS, JS, Images) to pass through
  if (
    pathname.startsWith('/_next') || // Next.js assets
    pathname.startsWith('/static') || // Custom static files
    pathname.match(/\.(ico|png|jpg|jpeg|css|js|svg|woff2?)$/) // Static file extensions
  ) {
    return NextResponse.next();
  }

  if (hostname.includes(mainDomain)) {
    subdomain = hostname.replace(`.${mainDomain}`, '').split('.')[0];
  } else if (hostname.startsWith('localhost')) {
    const url = new URL(req.url);
    subdomain = url.searchParams.get('subdomain') || 'local';
  }

  // If no subdomain, continue as normal
  if (
    !subdomain ||
    hostname === mainDomain ||
    hostname === 'localhost:3000' ||
    subdomain === 'www'
  ) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-subdomain', subdomain);

  return NextResponse.rewrite(new URL(`/club/${subdomain}`, req.url), {
    headers: requestHeaders,
  });
}
