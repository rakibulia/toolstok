import Link from "next/link";

import { siteConfig } from "@/config/site";

const discoveryLinks = [
  {
    title: "AI Tools",
    description: "Explore software and applications powered by AI.",
    href: siteConfig.links.tools,
  },
  {
    title: "Categories",
    description: "Browse the AI ecosystem by category and use case.",
    href: siteConfig.links.categories,
  },
  {
    title: "Collections",
    description: "Discover curated collections of useful AI resources.",
    href: siteConfig.links.collections,
  },
  {
    title: "Compare",
    description: "Compare AI tools and find the right fit.",
    href: siteConfig.links.compare,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      {/* Hero */}
      <section className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex min-h-[620px] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold tracking-tight text-[#171717] sm:text-5xl lg:text-7xl">
              Discover the AI ecosystem.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6b7280] sm:text-xl">
              {siteConfig.description}
            </p>

            <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
              <Link
                href={siteConfig.links.search}
                className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#0f766e] px-6 font-medium text-white transition-opacity hover:opacity-90"
              >
                Explore AI tools
              </Link>

              <Link
                href={siteConfig.links.submit}
                className="flex h-12 flex-1 items-center justify-center rounded-lg border border-[#d1d5db] bg-white px-6 font-medium text-[#171717] transition-colors hover:bg-[#f8fafc]"
              >
                Submit a tool
              </Link>
            </div>
          </div>

          {/* Search preview */}
          <div className="mt-16 w-full max-w-3xl">
            <div className="flex h-14 items-center rounded-xl border border-[#d1d5db] bg-[#f8fafc] px-5 text-left shadow-sm">
              <span className="text-sm text-[#6b7280]">
                Search AI tools, models, agents, workflows, and more...
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery */}
      <section className="bg-white px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl">
              Explore ToolsTok
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[#6b7280]">
              A structured, open-source way to discover and explore the
              growing AI ecosystem.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {discoveryLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-xl border border-[#e5e7eb] bg-white p-6 transition-colors hover:bg-[#f8fafc]"
              >
                <h3 className="font-semibold text-[#171717]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6b7280]">
                  {item.description}
                </p>

                <span className="mt-6 inline-block text-sm font-medium text-[#0f766e]">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="border-t border-[#e5e7eb] bg-[#f8fafc]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl">
            Built openly. Discover freely.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6b7280]">
            ToolsTok is an open-source, community-powered platform for
            discovering, exploring, comparing, verifying, and sharing AI
            resources.
          </p>

          <Link
            href={siteConfig.links.submit}
            className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-[#0f766e] px-6 font-medium text-white transition-opacity hover:opacity-90"
          >
            Contribute to ToolsTok
          </Link>
        </div>
      </section>
    </main>
  );
}