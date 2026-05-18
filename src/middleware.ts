import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Ambil token dari cookies (ini hanya simulasi login untuk MVP)
  const authToken = request.cookies.get('auth-token')?.value

  // Jika user mencoba mengakses halaman /tools atau /profile tapi belum login
  if (request.nextUrl.pathname.startsWith('/tools') || request.nextUrl.pathname.startsWith('/profile')) {
    if (!authToken) {
      // Redirect ke halaman login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Jika user sudah login tapi mencoba mengakses halaman login
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (authToken) {
      // Redirect ke halaman beranda/tools
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  // Jalankan middleware ini hanya di rute berikut
  matcher: ['/tools/:path*', '/login', '/profile'],
}
