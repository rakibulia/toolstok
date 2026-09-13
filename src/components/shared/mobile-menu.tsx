"use client";

import { useState } from "react";
import Link from "next/link";

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
  {
    label: "Search",
    href: siteConfig.links.search,
  },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#171717] transition-colors hover:bg-[#f8fafc]"
      >
        {open ? (
          <span className="text-xl leading-none">×</span>
        ) : (
          <span className="flex flex-col gap-1">
            <span className="block h-0.5 w-4 bg-[#171717]" />
            <span className="block h-0.5 w-4 bg-[#171717]" />
            <span className="block h-0.5 w-4 bg-[#171717]" />
          </span>
        )}
      </button>

      {open && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-16 border-b border-[#e5e7eb] bg-white shadow-sm"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-7xl px-6 py-5 sm:px-8"
          >
            <div className="flex flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-[#f1f5f9] py-4 text-base font-medium text-[#171717] transition-colors hover:text-[#0f766e]"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href={siteConfig.links.submit}
                onClick={closeMenu}
                className="mt-5 flex h-11 items-center justify-center rounded-lg bg-[#0f766e] px-5 font-medium text-white transition-opacity hover:opacity-90"
              >
                Submit a tool
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}