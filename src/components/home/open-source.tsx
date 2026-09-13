import Link from "next/link";

import { siteConfig } from "@/config/site";

export function OpenSource() {
  return (
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
  );
}