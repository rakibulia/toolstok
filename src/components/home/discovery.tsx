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

export function Discovery() {
  return (
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
  );
}