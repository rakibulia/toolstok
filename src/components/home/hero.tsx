import Link from "next/link";

import { siteConfig } from "@/config/site";

export function Hero() {
  return (
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
             href={siteConfig.links.signup}
              className="flex h-12 flex-1 items-center justify-center rounded-lg border border-[#d1d5db] bg-white px-6 font-medium text-[#171717] transition-colors hover:bg-[#f8fafc]"
            >
              Join free
            </Link>
          </div>
        </div>

        <div className="mt-16 w-full max-w-3xl">
          <div className="flex h-14 items-center rounded-xl border border-[#d1d5db] bg-[#f8fafc] px-5 text-left shadow-sm">
            <span className="text-sm text-[#6b7280]">
              Search AI tools, models, agents, workflows, and more...
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}