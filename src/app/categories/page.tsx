import Link from "next/link";

import { siteConfig } from "@/config/site";
import { getActiveCategories } from "@/db/queries";

export const metadata = {
  title: `AI Categories | ${siteConfig.name}`,
  description:
    "Explore AI tools and resources by category on ToolsTok.",
};

export default async function CategoriesPage() {
  const categories = await getActiveCategories();

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <section className="border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-[#0f766e]">
              AI Ecosystem
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Explore AI categories.
            </h1>

            <p className="mt-5 text-lg leading-8 text-[#6b7280]">
              Discover AI tools, models, agents, and other resources organized
              by what they help you do.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        {categories.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`${siteConfig.links.categories}/${category.slug}`}
                className="group rounded-xl border border-[#e5e7eb] bg-white p-6 transition-colors hover:border-[#0f766e] hover:bg-[#f8fafc]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold text-[#171717] group-hover:text-[#0f766e]">
                    {category.name}
                  </h2>

                  <span
                    aria-hidden="true"
                    className="text-[#9ca3af] transition-transform group-hover:translate-x-1"
                  >
                    ?
                  </span>
                </div>

                {category.description && (
                  <p className="mt-3 text-sm leading-6 text-[#6b7280]">
                    {category.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#d1d5db] px-6 py-16 text-center">
            <h2 className="text-lg font-semibold">
              No categories available yet.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6b7280]">
              Categories will appear here as the AI ecosystem grows.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
