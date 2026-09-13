import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";

const platformLinks = [
  { label: "AI Tools", href: siteConfig.links.tools },
  { label: "Categories", href: siteConfig.links.categories },
  { label: "Collections", href: siteConfig.links.collections },
  { label: "Compare", href: siteConfig.links.compare },
  { label: "Search", href: siteConfig.links.search },
];

const communityLinks = [
  { label: "Submit a Tool", href: siteConfig.links.submit },
  { label: "GitHub", href: siteConfig.social.github },
];

const socialLinks = [
  {
    label: "GitHub",
    href: siteConfig.social.github,
    icon: "/icons/social/github.svg",
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    icon: "/icons/social/facebook.svg",
  },
  {
    label: "YouTube",
    href: siteConfig.social.youtube,
    icon: "/icons/social/youtube.svg",
  },
  {
    label: "X",
    href: siteConfig.social.x,
    icon: "/icons/social/x.svg",
  },
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: "/icons/social/instagram.svg",
  },
  {
    label: "Telegram",
    href: siteConfig.social.telegram,
    icon: "/icons/social/telegram.svg",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#e5e7eb] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              href={siteConfig.links.home}
              className="inline-flex items-center gap-2"
              aria-label="ToolsTok home"
            >
              <Image
                src="/brand/icon.svg"
                alt=""
                width={30}
                height={30}
              />

              <span className="text-lg font-semibold tracking-tight text-[#171717]">
                ToolsTok
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#6b7280]">
              Discover, explore, compare, and share AI tools and the AI
              ecosystem.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                if (!social.href) {
                  return null;
                }

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white transition-colors hover:bg-[#f8fafc]"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={18}
                      height={18}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#171717]">
              Platform
            </h2>

            <nav className="mt-4 flex flex-col gap-3" aria-label="Platform">
              {platformLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-[#6b7280] transition-colors hover:text-[#0f766e]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#171717]">
              Community
            </h2>

            <nav className="mt-4 flex flex-col gap-3" aria-label="Community">
              {communityLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-[#6b7280] transition-colors hover:text-[#0f766e]"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#e5e7eb] pt-6 text-sm text-[#6b7280] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Open source.
          </p>

          <p>Built for the open AI ecosystem.</p>
        </div>
      </div>
    </footer>
  );
}