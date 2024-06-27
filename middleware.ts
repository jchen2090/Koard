import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  let authenticated: boolean;

  if (process.env.APP_ENV === "dev") {
    authenticated = true;
  } else if (process.env.APP_ENV === "prod") {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    authenticated = !!user;
  } else {
    throw new Error("APP_ENV Not specified in .env");
  }

  // Public Pages
  if (request.nextUrl.pathname.startsWith("/about")) {
    return response;
  }

  // Protected Pages
  if (!authenticated) {
    if (request.nextUrl.pathname.startsWith("/login")) {
      return response;
    }

    if (request.nextUrl.pathname.startsWith("/signup")) {
      return response;
    }

    if (request.nextUrl.pathname.startsWith("/project")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/project", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/project", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
