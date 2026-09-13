import { URL } from "node:url";

import {
  fetchLogo,
  type LogoFetchCandidate,
} from "./logo-fetcher";

export type LogoSource =
  | "official"
  | "favicon"
  | "google"
  | "hunter"
  | "duckduckgo"
  | "iconhorse"
  | "generated"
  | "unknown";

export type LogoResolution = {
  domain: string;
  logoUrl: string | null;
  source: LogoSource;
  body: Buffer | null;
  contentType: string | null;
  sourceUrl: string | null;
};

function normalizeDomain(
  value: string,
): string | null {
  try {
    const url = value.includes("://")
      ? new URL(value)
      : new URL(`https://${value}`);

    return url.hostname
      .toLowerCase()
      .replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function getDomainFromUrl(
  websiteUrl: string,
): string | null {
  return normalizeDomain(websiteUrl);
}

export function getOfficialFaviconUrl(
  domain: string,
): string {
  return `https://${domain}/favicon.ico`;
}

export function getGoogleFaviconUrl(
  domain: string,
): string {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    domain,
  )}&sz=128`;
}

export function getHunterLogoUrl(
  domain: string,
): string {
  return `https://logos.hunter.io/${encodeURIComponent(
    domain,
  )}`;
}

export function getDuckDuckGoFaviconUrl(
  domain: string,
): string {
  return `https://icons.duckduckgo.com/ip3/${encodeURIComponent(
    domain,
  )}.ico`;
}

export function getIconHorseUrl(
  domain: string,
): string {
  return `https://icon.horse/icon/${encodeURIComponent(
    domain,
  )}`;
}

function buildCandidates(
  domain: string,
): LogoFetchCandidate[] {
  return [
    {
      source: "official",
      url: getOfficialFaviconUrl(domain),
    },
    {
      source: "google",
      url: getGoogleFaviconUrl(domain),
    },
    {
      source: "hunter",
      url: getHunterLogoUrl(domain),
    },
    {
      source: "duckduckgo",
      url: getDuckDuckGoFaviconUrl(domain),
    },
    {
      source: "iconhorse",
      url: getIconHorseUrl(domain),
    },
  ];
}

export async function resolveLogo(
  websiteUrl: string,
): Promise<LogoResolution | null> {
  const domain = normalizeDomain(websiteUrl);

  if (!domain) {
    return null;
  }

  const result = await fetchLogo(
    buildCandidates(domain),
  );

  if (!result) {
    return {
      domain,
      logoUrl: null,
      source: "generated",
      body: null,
      contentType: null,
      sourceUrl: null,
    };
  }

  return {
    domain,
    logoUrl: null,
    source: result.source,
    body: result.body,
    contentType: result.contentType,
    sourceUrl: result.sourceUrl,
  };
}