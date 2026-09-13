import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

import "./globals.css";

import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "ToolsTok — Discover the AI Ecosystem",
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  applicationName: siteConfig.name,

  keywords: [
    "AI tools",
    "AI tools directory",
    "AI software",
    "open source AI",
    "AI applications",
    "AI ecosystem",
    "AI discovery",
  ],

  icons: {
    icon: [
      {
        url: "/brand/icon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/brand/icon.png",
        type: "image/png",
      },
    ],
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "ToolsTok — Discover the AI Ecosystem",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolsTok — Discover the AI Ecosystem",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ToolsTok — Discover the AI Ecosystem",
    description: siteConfig.description,
    images: ["/brand/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
     <body className="min-h-full flex flex-col">
  <Header />
  {children}
  <Footer />
</body>
    </html>
  );
}
