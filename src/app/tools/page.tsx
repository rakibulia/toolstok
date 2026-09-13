import Link from "next/link";

import { siteConfig } from "@/config/site";

const filters = [
  "All",
  "Open Source",
  "Free",
  "Freemium",
  "Paid",
  "Self-Hosted",
];

const categories = [
  "AI Assistants",
  "Writing",
  "Image Generation",
  "Video",
  "Audio",
  "Coding",
  "Productivity",
  "Research",
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <section className="border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-[#0f766e]">
              AI Tools Directory
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Discover AI tools.
            </h1>

            <p className="mt-5 text-lg leading-8 text-[#6b7280]">
              Explore AI software, applications, and resources across the
              growing AI ecosystem.
            </p>
          </div>

          <div className="mt-10">
            <label htmlFor="tool-search" className="sr-only">
              Search AI tools
            </label>

            <div className="flex h-12 w-full max-w-3xl items-center rounded-lg border border-[#d1d5db] bg-white px-4 shadow-sm">
              <input
                id="tool-search"
                type="search"
                placeholder="Search AI tools..."
                className="w-full bg-transparent text-sm text-[#171717] outline-none placeholder:text-[#9ca3af]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e5e7eb] bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  index === 0
                    ? "bg-[#0f766e] text-white"
                    : "border border-[#d1d5db] bg-white text-[#4b5563] hover:bg-[#f1f5f9]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <aside>
            <h2 className="text-sm font-semibold text-[#171717]">
              Categories
            </h2>

            <div className="mt-4 flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="rounded-lg px-3 py-2 text-left text-sm text-[#6b7280] transition-colors hover:bg-[#f8fafc] hover:text-[#0f766e]"
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>

          <div>
            <div className="flex flex-col gap-3 border-b border-[#e5e7eb] pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  AI Tools
                </h2>

                <p className="mt-1 text-sm text-[#6b7280]">
                  Explore the community-powered directory.
                </p>
              </div>

              <select
                aria-label="Sort tools"
                className="h-10 rounded-lg border border-[#d1d5db] bg-white px-3 text-sm text-[#171717] outline-none"
                defaultValue="popular"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="updated">Recently Updated</option>
              </select>
            </div>

            <div className="mt-8 rounded-xl border border-dashed border-[#d1d5db] px-6 py-16 text-center">
              <h3 className="text-lg font-semibold">
                The directory is being built.
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#6b7280]">
                ToolsTok will populate this directory with structured,
                community-powered AI tool data. Everything will remain
                publicly accessible.
              </p>

              <Link
                href={siteConfig.links.submit}
                className="mt-7 inline-flex h-11 items-center justify-center rounded-lg bg-[#0f766e] px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Submit the first tool
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}