import Link from "next/link";

import { siteConfig } from "@/config/site";
import {
  getPublishedResourcesPaginated,
  type ResourceListFilters,
  type ResourceSort,
} from "@/db/queries/resources";
import { createLogoStorage } from "@/lib/storage/logo-storage";
import { ToolCard } from "@/components/tools/tool-card";

const PAGE_SIZE = 24;

const RESOURCE_TYPES = [
  "tool",
  "model",
  "agent",
  "mcp_server",
  "skill",
  "workflow",
  "automation",
  "dataset",
  "sdk",
  "api",
  "framework",
  "infrastructure",
  "hardware",
  "robotics",
  "other",
] as const;

const PRICING_MODELS = [
  "free",
  "freemium",
  "paid",
  "open_source",
  "contact",
  "unknown",
] as const;

const SORT_OPTIONS = [
  "newest",
  "popular",
  "updated",
] as const;

type SearchParams = {
  search?: string;
  type?: string;
  pricingModel?: string;
  sort?: string;
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

function getCategoryLabel(
  type:
    | "tool"
    | "model"
    | "agent"
    | "mcp_server"
    | "skill"
    | "workflow"
    | "automation"
    | "dataset"
    | "sdk"
    | "api"
    | "framework"
    | "infrastructure"
    | "hardware"
    | "robotics"
    | "other",
) {
  const labels: Record<typeof type, string> = {
    tool: "AI Tool",
    model: "AI Model",
    agent: "AI Agent",
    mcp_server: "MCP Server",
    skill: "AI Skill",
    workflow: "Workflow",
    automation: "Automation",
    dataset: "Dataset",
    sdk: "SDK",
    api: "API",
    framework: "Framework",
    infrastructure: "Infrastructure",
    hardware: "Hardware",
    robotics: "Robotics",
    other: "AI Resource",
  };

  return labels[type];
}

function parseSearchParam(
  value: string | undefined,
): string | undefined {
  const normalized = value?.trim();

  return normalized || undefined;
}

function parseType(
  value: string | undefined,
): ResourceListFilters["type"] | undefined {
  if (!value) return undefined;

  return (RESOURCE_TYPES as readonly string[]).includes(value)
    ? (value as ResourceListFilters["type"])
    : undefined;
}

function parsePricingModel(
  value: string | undefined,
): ResourceListFilters["pricingModel"] | undefined {
  if (!value) return undefined;

  return (PRICING_MODELS as readonly string[]).includes(value)
    ? (value as ResourceListFilters["pricingModel"])
    : undefined;
}

function parseSort(value: string | undefined): ResourceSort {
  if (
    value &&
    (SORT_OPTIONS as readonly string[]).includes(value)
  ) {
    return value as ResourceSort;
  }

  return "newest";
}

function buildToolsUrl(
  params: SearchParams,
): string {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.type) {
    searchParams.set("type", params.type);
  }

  if (params.pricingModel) {
    searchParams.set("pricingModel", params.pricingModel);
  }

  if (params.sort && params.sort !== "newest") {
    searchParams.set("sort", params.sort);
  }

  const query = searchParams.toString();

  return query
    ? `${siteConfig.links.tools}?${query}`
    : siteConfig.links.tools;
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const search = parseSearchParam(params.search);
  const type = parseType(params.type);
  const pricingModel = parsePricingModel(
    params.pricingModel,
  );
  const sort = parseSort(params.sort);

  const logoStorage = createLogoStorage();

  const result = await getPublishedResourcesPaginated(
    PAGE_SIZE,
    0,
    {
      search,
      type,
      pricingModel,
    },
    sort,
  );

  const filterLinks = [
    ["All", undefined],
    ["Open Source", "open_source"],
    ["Free", "free"],
    ["Freemium", "freemium"],
    ["Paid", "paid"],
  ] as const;

  const resourceTypes = [
    ["AI Tools", "tool"],
    ["AI Models", "model"],
    ["AI Agents", "agent"],
    ["MCP Servers", "mcp_server"],
    ["Workflows", "workflow"],
    ["APIs", "api"],
    ["Frameworks", "framework"],
  ] as const;

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
              Explore AI software, applications, and resources
              across the growing AI ecosystem.
            </p>
          </div>

          <form
            action={siteConfig.links.tools}
            method="get"
            className="mt-10"
          >
            {type && (
              <input
                type="hidden"
                name="type"
                value={type}
              />
            )}

            {pricingModel && (
              <input
                type="hidden"
                name="pricingModel"
                value={pricingModel}
              />
            )}

            {sort !== "newest" && (
              <input
                type="hidden"
                name="sort"
                value={sort}
              />
            )}

            <label
              htmlFor="tool-search"
              className="sr-only"
            >
              Search AI tools
            </label>

            <div className="flex h-12 w-full max-w-3xl items-center rounded-lg border border-[#d1d5db] bg-white px-4 shadow-sm">
              <input
                id="tool-search"
                name="search"
                type="search"
                defaultValue={search ?? ""}
                placeholder="Search AI tools..."
                className="w-full bg-transparent text-sm text-[#171717] outline-none placeholder:text-[#9ca3af]"
              />

              <button
                type="submit"
                className="ml-3 rounded-md bg-[#0f766e] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="border-b border-[#e5e7eb] bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {filterLinks.map(([label, value]) => {
              const isActive =
                value === undefined
                  ? !pricingModel
                  : pricingModel === value;

              return (
                <Link
                  key={label}
                  href={buildToolsUrl({
                    search,
                    type,
                    pricingModel: value,
                    sort,
                  })}
                  className={`rounded-lg px-4 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-[#0f766e] text-white"
                      : "border border-[#d1d5db] bg-white text-[#4b5563] hover:bg-[#f1f5f9]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <aside>
            <h2 className="text-sm font-semibold text-[#171717]">
              Resource Types
            </h2>

            <div className="mt-4 flex flex-col gap-2">
              {resourceTypes.map(([label, resourceType]) => {
                const isActive = type === resourceType;

                return (
                  <Link
                    key={resourceType}
                    href={buildToolsUrl({
                      search,
                      type: resourceType,
                      pricingModel,
                      sort,
                    })}
                    className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-[#f0fdfa] font-medium text-[#0f766e]"
                        : "text-[#6b7280] hover:bg-[#f8fafc] hover:text-[#0f766e]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </aside>

          <div>
            <div className="flex flex-col gap-3 border-b border-[#e5e7eb] pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  AI Resources
                </h2>

                <p className="mt-1 text-sm text-[#6b7280]">
                  {result.total} published resources
                  {search ? ` matching “${search}”` : ""}
                </p>
              </div>

              <form
                action={siteConfig.links.tools}
                method="get"
              >
                {search && (
                  <input
                    type="hidden"
                    name="search"
                    value={search}
                  />
                )}

                {type && (
                  <input
                    type="hidden"
                    name="type"
                    value={type}
                  />
                )}

                {pricingModel && (
                  <input
                    type="hidden"
                    name="pricingModel"
                    value={pricingModel}
                  />
                )}

                <label
                  className="sr-only"
                  htmlFor="sort"
                >
                  Sort resources
                </label>

                <select
                  id="sort"
                  name="sort"
                  aria-label="Sort resources"
                  defaultValue={sort}
                  className="h-10 rounded-lg border border-[#d1d5db] bg-white px-3 text-sm text-[#171717] outline-none"
                >
                  <option value="newest">
                    Newest
                  </option>

                  <option value="popular">
                    Most Popular
                  </option>

                  <option value="updated">
                    Recently Updated
                  </option>
                </select>

                <button
                  type="submit"
                  className="ml-2 h-10 rounded-lg border border-[#d1d5db] bg-white px-3 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
                >
                  Apply
                </button>
              </form>
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
                      category: getCategoryLabel(
                        resource.type,
                      ),
                      pricing: getPricingLabel(
                        resource.pricingModel,
                      ),
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
                <h3 className="text-lg font-semibold">
                  No AI resources found.
                </h3>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6b7280]">
                  Try a different search or remove one of
                  the active filters.
                </p>

                <div className="mt-7">
                  <Link
                    href={siteConfig.links.tools}
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-[#d1d5db] bg-white px-5 text-sm font-medium text-[#374151] transition-colors hover:bg-[#f8fafc]"
                  >
                    Clear filters
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}