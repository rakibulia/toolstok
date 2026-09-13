import { logout } from "./actions";
import { getCurrentToolsUser } from "@/lib/auth/current-tools-user";

export default async function AccountPage() {
  const user = await getCurrentToolsUser();

  if (!user) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-[#fafafa] px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-semibold text-[#171717]">
              You're not logged in
            </h1>

            <p className="mt-2 text-sm text-[#6b7280]">
              Log in to access your ToolsTok account.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#fafafa] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#171717]">
                Your ToolsTok account
              </h1>

              <p className="mt-2 text-sm text-[#6b7280]">
                Manage your account and community activity.
              </p>
            </div>

            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] transition hover:bg-[#f9fafb]"
              >
                Log out
              </button>
            </form>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[#9ca3af]">
                Name
              </p>

              <p className="mt-1 text-sm text-[#374151]">
                {user.displayName ?? "Not set"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[#9ca3af]">
                Email
              </p>

              <p className="mt-1 text-sm text-[#374151]">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}