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

    login: "/login",
    signup: "/signup",
    account: "/account",
  },

  social: {
    github: "https://github.com/rakibulia/toolstok",
    facebook: "https://facebook.com/toolstokAI",
    youtube: "https://youtube.com/@toolstok",
    x: "",
    instagram: "",
    telegram: "",
  },
} as const;