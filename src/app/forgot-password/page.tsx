import Link from "next/link";

import { ForgotPasswordForm } from "./forgot-password-form";
import { siteConfig } from "@/config/site";
export default function ForgotPasswordPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#fafafa] px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-[#171717]">
              Reset your password
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#6b7280]">
              Enter your email address and we'll send you a link to reset
              your password.
            </p>
          </div>

          <ForgotPasswordForm />

          <p className="mt-6 text-center text-sm text-[#6b7280]">
            Remember your password?{" "}
            <Link
             href={siteConfig.links.login}
              className="font-medium text-[#0f766e] hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}