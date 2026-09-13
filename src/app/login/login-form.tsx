"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

import {
  login,
  type LoginState,
} from "./actions";

const initialState: LoginState = {
  success: false,
  message: "",
};

export function LoginForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    login,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.push("/");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <div className="mt-8">
      <GoogleSignInButton />

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#e5e7eb]" />

        <span className="text-xs font-medium uppercase tracking-wide text-[#9ca3af]">
          or
        </span>

        <div className="h-px flex-1 bg-[#e5e7eb]" />
      </div>

      <form action={formAction} className="space-y-5">
        {state.message && !state.success && (
          <div
            role="alert"
            className="rounded-lg border border-[#fecaca] bg-[#fef2f2] px-3 py-2.5 text-sm text-[#b91c1c]"
          >
            {state.message}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#374151]"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none transition placeholder:text-[#9ca3af] focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#374151]"
            >
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-xs font-medium text-[#0f766e] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Your password"
            className="w-full rounded-lg border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none transition placeholder:text-[#9ca3af] focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-[#171717] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#262626] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Logging in..." : "Log in"}
        </button>

        <p className="text-center text-sm text-[#6b7280]">
          Don't have an account?{" "}
          <Link
            href={siteConfig.links.signup}
            className="font-medium text-[#0f766e] hover:underline"
          >
            Join ToolsTok for free
          </Link>
        </p>
      </form>
    </div>
  );
}