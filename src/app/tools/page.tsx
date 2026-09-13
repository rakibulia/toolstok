import Link from "next/link";

import { ToolCard } from "@/components/tools/tool-card";
import {
  getPublishedResourcesPaginated,
} from "@/db/queries/resources";
import { siteConfig } from "@/config/site";

const PAGE_SIZE = 24;

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

export default async function ToolsPage() {
  const result = await getPublishedResourcesPaginated(
    PAGE_SIZE,
    0,
  );

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

          <div className="mt-10">
            <label
              htmlFor="tool-search"
              className="sr-only"
            >
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
            {[
              ["All", ""],
              ["Open Source", "open_source"],
              ["Free", "free"],
              ["Freemium", "freemium"],
              ["Paid", "paid"],
            ].map(([label, value], index) => (
              <Link
                key={label}
                href={
                  value
                    ? `${siteConfig.links.tools}?pricingModel=${value}`
                    : siteConfig.links.tools
                }
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  index === 0
                    ? "bg-[#0f766e] text-white"
                    : "border border-[#d1d5db] bg-white text-[#4b5563] hover:bg-[#f1f5f9]"
                }`}
              >
                {label}
              </Link>
            ))}
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
              {[
                ["AI Tools", "tool"],
                ["AI Models", "model"],
                ["AI Agents", "agent"],
                ["MCP Servers", "mcp_server"],
                ["Workflows", "workflow"],
                ["APIs", "api"],
                ["Frameworks", "framework"],
              ].map(([label, type]) => (
                <Link
                  key={type}
                  href={`${siteConfig.links.tools}?type=${type}`}
                  className="rounded-lg px-3 py-2 text-left text-sm text-[#6b7280] transition-colors hover:bg-[#f8fafc] hover:text-[#0f766e]"
                >
                  {label}
                </Link>
              ))}
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
                </p>
              </div>

              <select
                aria-label="Sort resources"
                className="h-10 rounded-lg border border-[#d1d5db] bg-white px-3 text-sm text-[#171717] outline-none"
                defaultValue="newest"
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
                      logo: resource.logoUrl ?? undefined,
                      verified: resource.isVerified,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-xl border border-dashed border-[#d1d5db] px-6 py-16 text-center">
                <h3 className="text-lg font-semibold">
                  Help build the AI ecosystem directory.
                </h3>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6b7280]">
                  Know an AI tool, model, agent, MCP server,
                  workflow, dataset, API, framework, or another
                  useful AI resource? Suggest it for ToolsTok.
                  You can also contribute directly to the
                  open-source project on GitHub.
                </p>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href={siteConfig.links.submit}
                    className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0f766e] px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Suggest a Resource
                  </Link>

                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-[#d1d5db] bg-white px-5 text-sm font-medium text-[#374151] transition-colors hover:bg-[#f8fafc]"
                  >
                    Contribute on GitHub
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}