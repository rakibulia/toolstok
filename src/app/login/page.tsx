import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#fafafa] px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-[#171717]">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#6b7280]">
              Log in to save tools, write reviews, comment, and contribute
              to the ToolsTok community.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}