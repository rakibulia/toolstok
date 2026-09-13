import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/shared/mobile-menu";
import { siteConfig } from "@/config/site";

const navigation = [
  {
    label: "AI Tools",
    href: siteConfig.links.tools,
  },
  {
    label: "Categories",
    href: siteConfig.links.categories,
  },
  {
    label: "Collections",
    href: siteConfig.links.collections,
  },
  {
    label: "Compare",
    href: siteConfig.links.compare,
  },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e7eb] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link
          href={siteConfig.links.home}
          className="flex items-center gap-2"
          aria-label="ToolsTok home"
        >
          <Image
            src="/brand/icon.svg"
            alt=""
            width={32}
            height={32}
            priority
          />

          <span className="text-lg font-semibold tracking-tight text-[#171717]">
            ToolsTok
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#4b5563] transition-colors hover:text-[#0f766e]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={siteConfig.links.search}
            className="hidden h-9 items-center justify-center rounded-lg border border-[#d1d5db] px-4 text-sm font-medium text-[#171717] transition-colors hover:bg-[#f8fafc] sm:flex"
          >
            Search
          </Link>

          <Link
            href={siteConfig.links.submit}
            className="hidden h-9 items-center justify-center rounded-lg bg-[#0f766e] px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:flex"
          >
            Submit a tool
          </Link>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}