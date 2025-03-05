import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || '';
  const mainDomain = 'ukbridge.club';

  let subdomain = null;

  if (hostname.includes(mainDomain)) {
    // Extract subdomain in production (e.g., "wgc" from "wgc.ukbridge.club")
    subdomain = hostname.replace(`.${mainDomain}`, '').split('.')[0];
  } else if (hostname.startsWith('localhost')) {
    // Simulate subdomains locally using a query parameter or a custom header
    const url = new URL(req.url);
    subdomain = url.searchParams.get('subdomain') || 'local';
  }

  // Bypass middleware for Next.js static files and assets
  if (
    req.nextUrl.pathname.startsWith('/_next') || // Next.js static assets
    req.nextUrl.pathname.startsWith('/static') || // Custom static assets
    req.nextUrl.pathname.endsWith('.ico') || // Favicons
    req.nextUrl.pathname.endsWith('.png') || // Images
    req.nextUrl.pathname.endsWith('.jpg') || // Images
    req.nextUrl.pathname.endsWith('.jpeg') || // Images
    req.nextUrl.pathname.endsWith('.css') || // Stylesheets
    req.nextUrl.pathname.endsWith('.js') // JavaScript files
  ) {
    return NextResponse.next();
  }

  // If no subdomain, continue as normal
  if (
    !subdomain ||
    hostname === mainDomain ||
    subdomain === 'www' ||
    hostname === 'localhost:3000'
  ) {
    return NextResponse.next();
  }

  // Store subdomain information in headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-subdomain', subdomain);

  // Rewrite request to dynamic route
  return NextResponse.rewrite(new URL(`/club/${subdomain}`, req.url), {
    headers: requestHeaders,
  });
}
