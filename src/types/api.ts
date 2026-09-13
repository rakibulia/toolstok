export type ApiSuccessResponse<
  T,
  M extends Record<string, unknown> | undefined = undefined,
> = {
  data: T;
  meta?: M;
};

export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export type PaginationMeta = {
  page: number;
  limit: number;
  count: number;
  total: number;
  hasMore: boolean;
};