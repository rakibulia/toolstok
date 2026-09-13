import { env } from "@/config/env";

const MAX_LOGO_SIZE = 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
  "image/x-icon",
  "image/vnd.microsoft.icon",
]);

export type LogoFetchCandidate = {
  source:
    | "official"
    | "google"
    | "hunter"
    | "duckduckgo"
    | "iconhorse";
  url: string;
};

export type LogoFetchResult = {
  body: Buffer;
  contentType: string;
  sourceUrl: string;
  source: LogoFetchCandidate["source"];
};

function normalizeContentType(
  contentType: string | null,
): string | null {
  if (!contentType) {
    return null;
  }

  const normalized = contentType
    .split(";")[0]
    .trim()
    .toLowerCase();

  if (ALLOWED_IMAGE_TYPES.has(normalized)) {
    return normalized;
  }

  return null;
}

function getUserAgent(): string {
  return `ToolsTok/1.0 (+${env.NEXT_PUBLIC_SITE_URL})`;
}

async function fetchImage(
  candidate: LogoFetchCandidate,
): Promise<LogoFetchResult | null> {
  try {
    const response = await fetch(candidate.url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
      headers: {
        Accept:
          "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "User-Agent": getUserAgent(),
      },
    });

    if (!response.ok) {
      return null;
    }

    const contentType = normalizeContentType(
      response.headers.get("content-type"),
    );

    if (!contentType) {
      return null;
    }

    const contentLength = response.headers.get(
      "content-length",
    );

    if (
      contentLength &&
      Number(contentLength) > MAX_LOGO_SIZE
    ) {
      return null;
    }

    if (!response.body) {
      return null;
    }

    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalSize = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        if (!value) {
          continue;
        }

        totalSize += value.byteLength;

        if (totalSize > MAX_LOGO_SIZE) {
          await reader.cancel();
          return null;
        }

        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }

    if (totalSize === 0) {
      return null;
    }

    const body = Buffer.concat(
      chunks.map((chunk) => Buffer.from(chunk)),
    );

    return {
      body,
      contentType,
      sourceUrl: response.url,
      source: candidate.source,
    };
  } catch {
    return null;
  }
}

export async function fetchLogo(
  candidates: LogoFetchCandidate[],
): Promise<LogoFetchResult | null> {
  for (const candidate of candidates) {
    const result = await fetchImage(candidate);

    if (result) {
      return result;
    }
  }

  return null;
}