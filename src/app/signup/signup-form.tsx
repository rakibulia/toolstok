"use client";

import Link from "next/link";
import { useActionState } from "react";
import { siteConfig } from "@/config/site";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

import {
  signup,
  type SignupState,
} from "./actions";

const initialState: SignupState = {
  success: false,
  message: "",
};

export function SignupForm() {
  const [state, formAction, pending] = useActionState(
    signup,
    initialState,
  );

  if (state.success) {
    return (
      <div className="mt-8 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] p-5 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#16a34a] text-white">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path
              d="m5 10 3 3 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className="mt-4 text-base font-semibold text-[#166534]">
          Check your email
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#4b5563]">
          {state.message}
        </p>

        <Link
          href={siteConfig.links.login}
          className="mt-5 inline-flex text-sm font-medium text-[#0f766e] hover:underline"
        >
          Go to login
        </Link>
      </div>
    );
  }

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
        {state.message && (
          <div
            role="alert"
            className="rounded-lg border border-[#fecaca] bg-[#fef2f2] px-3 py-2.5 text-sm text-[#b91c1c]"
          >
            {state.message}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-[#374151]"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Your name"
            aria-invalid={Boolean(state.fieldErrors?.name)}
            className="w-full rounded-lg border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none transition placeholder:text-[#9ca3af] focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
          />

          {state.fieldErrors?.name?.[0] && (
            <p className="mt-1.5 text-xs text-[#b91c1c]">
              {state.fieldErrors.name[0]}
            </p>
          )}
        </div>

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
            aria-invalid={Boolean(state.fieldErrors?.email)}
            className="w-full rounded-lg border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none transition placeholder:text-[#9ca3af] focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
          />

          {state.fieldErrors?.email?.[0] && (
            <p className="mt-1.5 text-xs text-[#b91c1c]">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-[#374151]"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={72}
            placeholder="At least 8 characters"
            aria-invalid={Boolean(state.fieldErrors?.password)}
            className="w-full rounded-lg border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none transition placeholder:text-[#9ca3af] focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
          />

          {state.fieldErrors?.password?.[0] && (
            <p className="mt-1.5 text-xs text-[#b91c1c]">
              {state.fieldErrors.password[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-sm font-medium text-[#374151]"
          >
            Confirm password
          </label>

          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={72}
            placeholder="Re-enter your password"
            aria-invalid={Boolean(
              state.fieldErrors?.confirmPassword,
            )}
            className="w-full rounded-lg border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none transition placeholder:text-[#9ca3af] focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
          />

          {state.fieldErrors?.confirmPassword?.[0] && (
            <p className="mt-1.5 text-xs text-[#b91c1c]">
              {state.fieldErrors.confirmPassword[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-[#171717] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#262626] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending
            ? "Creating account..."
            : "Create free account"}
        </button>

        <p className="text-center text-xs leading-5 text-[#6b7280]">
          By creating an account, you agree to use ToolsTok
          responsibly and contribute useful, accurate information.
        </p>

        <p className="text-center text-sm text-[#6b7280]">
          Already have an account?{" "}
          <Link
            href={siteConfig.links.login}
            className="font-medium text-[#0f766e] hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}