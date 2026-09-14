import Link from "next/link";
import { notFound } from "next/navigation";

import { ToolCard } from "@/components/tools/tool-card";
import { siteConfig } from "@/config/site";
import {
  getActiveCategoryBySlug,
  getPublishedResourcesByCategory,
} from "@/db/queries";
import { createLogoStorage } from "@/lib/storage/logo-storage";

const PAGE_SIZE = 24;

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getPricingLabel(
  pricingModel:
    | "free"
    | "freemium"
    | "paid"
    | "open_source"
    | "contact"
    | "unknown",
): "Free" | "Freemium" | "Paid" | "Open Source" {
  switch (pricingModel) {
    case "free":
      return "Free";

    case "freemium":
      return "Freemium";

    case "paid":
    case "contact":
      return "Paid";

    case "open_source":
      return "Open Source";

    default:
      return "Free";
  }
}

export async function generateMetadata({
  params,
}: CategoryPageProps) {
  const { slug } = await params;
  const category = await getActiveCategoryBySlug(slug);

  if (!category) {
    return {
      title: `Category Not Found | ${siteConfig.name}`,
    };
  }

  return {
    title: `${category.name} | ${siteConfig.name}`,
    description:
      category.description ??
      `Discover AI resources in ${category.name} on ${siteConfig.name}.`,
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;
  const category = await getActiveCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const result = await getPublishedResourcesByCategory(
    category.id,
    PAGE_SIZE,
    0,
    "newest",
  );

  const logoStorage = createLogoStorage();

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <section className="border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <Link
            href={siteConfig.links.categories}
            className="text-sm font-medium text-[#0f766e] hover:underline"
          >
            ← All categories
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-sm font-medium text-[#0f766e]">
              AI Category
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              {category.name}
            </h1>

            {category.description && (
              <p className="mt-5 text-lg leading-8 text-[#6b7280]">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-4 border-b border-[#e5e7eb] pb-5">
          <div>
            <h2 className="text-xl font-semibold">
              AI resources
            </h2>

            <p className="mt-1 text-sm text-[#6b7280]">
              {result.total} published resources
            </p>
          </div>
        </div>

        {result.data.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {result.data.map((resource) => (
              <ToolCard
                key={resource.id}
                tool={{
                  name: resource.name,
                  slug: resource.slug,
                  description:
                    resource.description ??
                    resource.tagline ??
                    "Explore this AI resource on ToolsTok.",
                  category: resource.type,
                  pricing: getPricingLabel(resource.pricingModel),
                  logo: resource.logoStoragePath
                    ? logoStorage.getPublicUrl(
                        resource.logoStoragePath,
                      )
                    : resource.logoUrl ?? undefined,
                  verified: resource.isVerified,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-[#d1d5db] px-6 py-16 text-center">
            <h2 className="text-lg font-semibold">
              No resources in this category yet.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6b7280]">
              Check back as the AI ecosystem grows.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}