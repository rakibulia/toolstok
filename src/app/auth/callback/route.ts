import { NextResponse } from "next/server";

import { env } from "@/config/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=oauth", env.NEXT_PUBLIC_SITE_URL),
    );
  }

  const supabase = await createSupabaseServerClient();

  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL("/login?error=oauth", env.NEXT_PUBLIC_SITE_URL),
    );
  }

  return NextResponse.redirect(
    new URL("/", env.NEXT_PUBLIC_SITE_URL),
  );
}