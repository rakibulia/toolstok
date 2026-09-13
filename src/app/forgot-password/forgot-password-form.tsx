"use client";

import Link from "next/link";
import { useActionState } from "react";
import { siteConfig } from "@/config/site";

import {
  forgotPassword,
  type ForgotPasswordState,
} from "./actions";

const initialState: ForgotPasswordState = {
  success: false,
  message: "",
};

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    forgotPassword,
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
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-8 space-y-5">
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

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[#171717] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#262626] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending
          ? "Sending reset link..."
          : "Send reset link"}
      </button>
    </form>
  );
}