"use client";

import { useTransition } from "react";

import { signInWithGoogle } from "@/app/auth-actions";

export function GoogleSignInButton() {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await signInWithGoogle();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#d1d5db] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] transition hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path
          fill="#4285F4"
          d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.23a4.46 4.46 0 0 1-1.94 2.93v2.43h3.14c1.84-1.7 2.92-4.2 2.92-7.19Z"
        />
        <path
          fill="#34A853"
          d="M12 21.68c2.63 0 4.84-.87 6.45-2.36l-3.14-2.43c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.29v2.5A9.74 9.74 0 0 0 12 21.68Z"
        />
        <path
          fill="#FBBC05"
          d="M6.53 13.79A5.86 5.86 0 0 1 6.23 12c0-.62.11-1.22.3-1.79v-2.5H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.29l3.24-2.5Z"
        />
        <path
          fill="#EA4335"
          d="M12 6.18c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.27 14.63 2.32 12 2.32a9.74 9.74 0 0 0-8.71 5.39l3.24 2.5c.77-2.31 2.93-4.03 5.47-4.03Z"
        />
      </svg>

      {pending ? "Connecting..." : "Continue with Google"}
    </button>
  );
}