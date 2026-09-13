export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

export interface RateLimiter {
  check(
    key: string,
    limit: number,
    windowSeconds: number,
  ): Promise<RateLimitResult>;
}

class MemoryRateLimiter implements RateLimiter {
  private readonly requests = new Map<
    string,
    {
      count: number;
      resetAt: number;
    }
  >();

  async check(
    key: string,
    limit: number,
    windowSeconds: number,
  ): Promise<RateLimitResult> {
    const now = Date.now();
    const existing = this.requests.get(key);

    if (!existing || existing.resetAt <= now) {
      const resetAt =
        now + windowSeconds * 1000;

      this.requests.set(key, {
        count: 1,
        resetAt,
      });

      return {
        success: true,
        limit,
        remaining: Math.max(limit - 1, 0),
        resetAt,
      };
    }

    if (existing.count >= limit) {
      return {
        success: false,
        limit,
        remaining: 0,
        resetAt: existing.resetAt,
      };
    }

    existing.count += 1;

    return {
      success: true,
      limit,
      remaining: Math.max(
        limit - existing.count,
        0,
      ),
      resetAt: existing.resetAt,
    };
  }
}

export const rateLimiter =
  new MemoryRateLimiter();