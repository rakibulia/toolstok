import { NextResponse } from "next/server";

export function apiSuccess<T>(
  data: T,
  meta?: Record<string, unknown>,
  status = 200,
) {
  return NextResponse.json(
    {
      data,
      ...(meta ? { meta } : {}),
    },
    { status },
  );
}

export function apiError(
  code: string,
  message: string,
  status: number,
) {
  return NextResponse.json(
    {
      error: {
        code,
        message,
      },
    },
    { status },
  );
}