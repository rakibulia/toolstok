import { z } from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1),
  NEXT_PUBLIC_SITE_DESCRIPTION: z.string().min(1),

  DATABASE_URL: z.string().optional(),
  DIRECT_DATABASE_URL: z.string().optional(),

  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().optional(),
  SUPABASE_SECRET_KEY: z.string().optional(),

  AUTH_SECRET: z.string().optional(),

  GITHUB_TOKEN: z.string().optional(),

  OPENAI_API_KEY: z.string().optional(),

  STORAGE_ENDPOINT: z.string().url().optional(),
  STORAGE_ACCESS_KEY: z.string().optional(),
  STORAGE_SECRET_KEY: z.string().optional(),
  STORAGE_BUCKET: z.string().optional(),
})

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,

  DATABASE_URL: process.env.DATABASE_URL || undefined,
  DIRECT_DATABASE_URL: process.env.DIRECT_DATABASE_URL || undefined,

  NEXT_PUBLIC_SUPABASE_URL:
    process.env.NEXT_PUBLIC_SUPABASE_URL || undefined,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || undefined,
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY || undefined,

  AUTH_SECRET: process.env.AUTH_SECRET || undefined,

  GITHUB_TOKEN: process.env.GITHUB_TOKEN || undefined,

  OPENAI_API_KEY: process.env.OPENAI_API_KEY || undefined,

  STORAGE_ENDPOINT: process.env.STORAGE_ENDPOINT || undefined,
  STORAGE_ACCESS_KEY: process.env.STORAGE_ACCESS_KEY || undefined,
  STORAGE_SECRET_KEY: process.env.STORAGE_SECRET_KEY || undefined,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET || undefined,
})
