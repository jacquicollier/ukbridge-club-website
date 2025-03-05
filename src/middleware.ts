import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || '';

  console.log('%s %s %s', hostname, req.url);

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

  // If no subdomain, continue as normal
  if (!subdomain || hostname === mainDomain || hostname === 'localhost:3000') {
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
