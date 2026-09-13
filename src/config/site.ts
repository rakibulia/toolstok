import { env } from "./env";

export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  url: env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ""),
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION,

  links: {
    home: "/",
    tools: "/tools",
    categories: "/categories",
    collections: "/collections",
    compare: "/compare",
    search: "/search",
    submit: "/submit",
  },

  social: {
    github: "https://github.com/rakibuli10/toolstok",
    facebook: "https://facebook.com/toolstokAI",
    youtube: "https://youtube.com/@toolstok",
    x: "https://x.com/OpenBlockOS",
    instagram: "",
    telegram: "https://t.me/OpenBlockOS",
  },
} as const;