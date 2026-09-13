import Image from "next/image";
import Link from "next/link";

export type ToolCardData = {
  name: string;
  slug: string;
  description: string;
  category: string;
  pricing: "Free" | "Freemium" | "Paid" | "Open Source";
  logo?: string;
  tags?: string[];
  verified?: boolean;
};

type ToolCardProps = {
  tool: ToolCardData;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-[#e5e7eb] bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#f8fafc]">
            {tool.logo ? (
              <Image
                src={tool.logo}
                alt={`${tool.name} logo`}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <span className="text-lg font-semibold text-[#0f766e]">
                {tool.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <Link
                href={`/tools/${tool.slug}`}
                className="font-semibold text-[#171717] hover:text-[#0f766e]"
              >
                {tool.name}
              </Link>

              {tool.verified && (
                <span
                  className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white"
                  title="Verified resource"
                  aria-label="Verified resource"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="h-3 w-3"
                  >
                    <path
                      d="M4 8.2 6.6 10.7 12 5.4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </div>

            <p className="mt-0.5 text-xs text-[#6b7280]">
              {tool.category}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#6b7280]">
        {tool.description}
      </p>

      {tool.tags && tool.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[#f8fafc] px-2 py-1 text-xs text-[#6b7280]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="text-xs font-medium text-[#4b5563]">
          {tool.pricing}
        </span>

        <Link
          href={`/tools/${tool.slug}`}
          className="text-sm font-medium text-[#0f766e] hover:underline"
        >
          View tool →
        </Link>
      </div>
    </article>
  );
}