import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC = [
  "/login",
  "/register",
  "/auth",
  "/forgot-password",
  "/reset-password",
];
const PROFILE_SETUP = "/profile-setup";
const FAMILY_SETUP = "/family-setup";
const ROLE_SETUP = "/role-setup";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const pathname = request.nextUrl.pathname;

  if (!url || !key) {
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublic = PUBLIC.some((p) => pathname.startsWith(p));

  if (!user) {
    if (!isPublic) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return response;
  }

  if (
    isPublic &&
    pathname !== "/reset-password" &&
    !pathname.startsWith("/auth/")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("profile_complete, family_id, role_assigned")
    .eq("id", user.id)
    .single();

  const complete = profile?.profile_complete === true;
  const hasFamily = !!profile?.family_id;
  const roleAssigned = profile?.role_assigned === true;

  const setupPaths = [PROFILE_SETUP, FAMILY_SETUP, ROLE_SETUP];
  const isSetup = setupPaths.includes(pathname);

  if (!complete && pathname !== PROFILE_SETUP) {
    return NextResponse.redirect(new URL(PROFILE_SETUP, request.url));
  }

  if (complete && !hasFamily && pathname !== FAMILY_SETUP) {
    return NextResponse.redirect(new URL(FAMILY_SETUP, request.url));
  }

  if (complete && hasFamily && !roleAssigned && pathname !== ROLE_SETUP) {
    return NextResponse.redirect(new URL(ROLE_SETUP, request.url));
  }

  if (complete && pathname === PROFILE_SETUP) {
    if (!hasFamily) return NextResponse.redirect(new URL(FAMILY_SETUP, request.url));
    if (!roleAssigned) return NextResponse.redirect(new URL(ROLE_SETUP, request.url));
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (hasFamily && pathname === FAMILY_SETUP) {
    return NextResponse.redirect(
      new URL(roleAssigned ? "/" : ROLE_SETUP, request.url),
    );
  }

  if (roleAssigned && pathname === ROLE_SETUP) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (hasFamily && roleAssigned && isSetup && pathname !== PROFILE_SETUP) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}
