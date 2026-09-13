export const rateLimitConfig = {
  resourceSubmission: {
    limit: 5,
    windowSeconds: 60 * 60,
  },

  reviewSubmission: {
    limit: 10,
    windowSeconds: 60 * 60,
  },

  contributionSubmission: {
    limit: 20,
    windowSeconds: 60 * 60,
  },

  publicApi: {
    limit: 120,
    windowSeconds: 60,
  },
} as const;