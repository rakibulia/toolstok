import { NextRequest } from "next/server";

import { rateLimitConfig } from "@/config/rate-limit";
import {
  getPublishedResourcesPaginated,
  type ResourceListFilters,
} from "@/db/queries/resources";
import { apiError, apiSuccess } from "@/lib/api/response";
import { requireUser } from "@/lib/auth/guards";
import { rateLimiter } from "@/lib/rate-limit";
import { submitResource } from "@/services/resource-submissions";
import type {
  ApiSuccessResponse,
  PaginationMeta,
} from "@/types/api";
import { paginationSchema } from "@/validation/api/pagination";
import { resourceListFiltersSchema } from "@/validation/resource-filters";
import { createResourceSchema } from "@/validation/resource";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const paginationParsed = paginationSchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    });

    if (!paginationParsed.success) {
      return apiError(
        "INVALID_PAGINATION",
        "Page must be at least 1 and limit must be between 1 and 100.",
        400,
      );
    }

    const filtersParsed =
      resourceListFiltersSchema.safeParse({
        search: searchParams.get("search") ?? undefined,
        type: searchParams.get("type") ?? undefined,
        pricingModel:
          searchParams.get("pricingModel") ?? undefined,
        sourceModel:
          searchParams.get("sourceModel") ?? undefined,
        verified:
          searchParams.get("verified") ?? undefined,
      });

    if (!filtersParsed.success) {
      return apiError(
        "INVALID_FILTERS",
        "One or more resource filters are invalid.",
        400,
      );
    }

    const { page, limit } = paginationParsed.data;

    const filters: ResourceListFilters =
      filtersParsed.data;

    const offset = (page - 1) * limit;

    const result =
      await getPublishedResourcesPaginated(
        limit,
        offset,
        filters,
      );

    const meta: PaginationMeta = {
      page,
      limit,
      count: result.data.length,
      total: result.total,
      hasMore:
        offset + result.data.length < result.total,
    };

    const response: ApiSuccessResponse<
      typeof result.data,
      PaginationMeta
    > = {
      data: result.data,
      meta,
    };

    return apiSuccess(
      response.data,
      response.meta,
    );
  } catch {
    return apiError(
      "INTERNAL_SERVER_ERROR",
      "Unable to fetch resources.",
      500,
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();

    const {
      limit,
      windowSeconds,
    } = rateLimitConfig.resourceSubmission;

    const rateLimit = await rateLimiter.check(
      `resource-submission:${user.id}`,
      limit,
      windowSeconds,
    );

    if (!rateLimit.success) {
      return apiError(
        "RATE_LIMITED",
        "Too many resource submissions. Please try again later.",
        429,
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return apiError(
        "INVALID_JSON",
        "Request body must contain valid JSON.",
        400,
      );
    }

    const parsed =
      createResourceSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(
        "INVALID_RESOURCE",
        "The submitted resource data is invalid.",
        400,
      );
    }

    const result = await submitResource(
      user.id,
      parsed.data,
    );

    return apiSuccess(
      result,
      undefined,
      201,
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "Authentication required."
    ) {
      return apiError(
        "UNAUTHORIZED",
        "Authentication is required.",
        401,
      );
    }

    if (
      error instanceof Error &&
      error.message ===
        "A resource with this slug already exists."
    ) {
      return apiError(
        "RESOURCE_EXISTS",
        "A resource with this slug already exists.",
        409,
      );
    }

    return apiError(
      "INTERNAL_SERVER_ERROR",
      "Unable to submit resource.",
      500,
    );
  }
}