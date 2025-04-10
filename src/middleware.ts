import { NextRequest, NextResponse } from 'next/server';

const CORS_METHODS = 'GET, POST, OPTIONS';
const CORS_HEADERS = 'Content-Type';

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  try {
    const { hostname } = new URL(origin);
    return (
      hostname.endsWith('.ukbridge.club') ||
      hostname === 'ukbridge.club' ||
      hostname.startsWith('localhost')
    );
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const hostname = req.headers.get('host') || '';
  const mainDomain = 'ukbridge.club';
  let subdomain: string | null = null;

  // ✅ Allow static assets to pass through
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(ico|png|jpg|jpeg|css|js|svg|woff2?)$/)
  ) {
    return NextResponse.next();
  }

  // 🔍 Extract subdomain
  if (hostname.includes(mainDomain)) {
    subdomain = hostname.replace(`.${mainDomain}`, '').split('.')[0];
  } else if (hostname.startsWith('localhost')) {
    const url = new URL(req.url);
    subdomain = url.searchParams.get('subdomain') || 'local';
  }

  // 🌐 Handle API subdomain with CORS logic
  if (subdomain === 'api') {
    const origin = req.headers.get('origin');

    // ✅ Respond directly to OPTIONS requests for CORS preflight
    if (req.method === 'OPTIONS') {
      const preflight = new NextResponse(null, { status: 204 });
      if (isAllowedOrigin(origin)) {
        preflight.headers.set('Access-Control-Allow-Origin', origin!);
        preflight.headers.set('Vary', 'Origin');
      }
      preflight.headers.set('Access-Control-Allow-Methods', CORS_METHODS);
      preflight.headers.set('Access-Control-Allow-Headers', CORS_HEADERS);
      return preflight;
    }

    // 🔁 Rewrite to internal /api route with CORS headers
    const rewritten = NextResponse.rewrite(new URL(`/api${pathname}`, req.url));
    if (isAllowedOrigin(origin)) {
      rewritten.headers.set('Access-Control-Allow-Origin', origin!);
      rewritten.headers.set('Vary', 'Origin');
    }
    rewritten.headers.set('Access-Control-Allow-Methods', CORS_METHODS);
    rewritten.headers.set('Access-Control-Allow-Headers', CORS_HEADERS);
    return rewritten;
  }

  // 🧭 Handle subdomain routing for club pages
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

  return NextResponse.rewrite(
    new URL(`/club/${subdomain}${pathname}`, req.url),
    {
      headers: requestHeaders,
    },
  );
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
