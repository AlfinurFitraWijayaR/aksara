import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Daftar route yang memerlukan autentikasi
const protectedRoutes = ["/analyze", "/business-health"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Cek apakah route saat ini memerlukan autentikasi
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Jika bukan protected route, lanjutkan request
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Buat response untuk memodifikasi cookies
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Jika user belum login, redirect ke halaman utama
  if (!user) {
    const redirectUrl = new URL("/", request.url);
    return NextResponse.redirect(redirectUrl);
  }
  return response;
}

// Config untuk menentukan route mana yang akan di-handle oleh middleware
export const config = {
  matcher: ["/analyze/:path*", "/business-health/:path*"],
};
