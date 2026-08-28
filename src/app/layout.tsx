import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/lib/seo/site-config";
import { buildOrganization, buildPerson, buildWebSite } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.siteName,
  authors: [{ name: siteConfig.siteName, url: siteConfig.siteUrl }],
  generator: "Next.js",
  keywords: [
    "Isaias Francisco Santos",
    "Isaias F. Santos",
    "full-stack developer",
    "Next.js",
    "Contentful",
    "React",
    "Node.js",
    "TypeScript",
    "portfolio",
    "São Paulo",
  ],
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "profile",
    siteName: siteConfig.siteName,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    url: siteConfig.siteUrl,
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 512,
        height: 512,
        alt: siteConfig.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [siteConfig.defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteConfig.siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.locale} className="dark">
      <body
        className={`bg-black text-zinc-100 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Site-wide JSON-LD. Per-page schemas (ProfilePage, BreadcrumbList)
            are rendered from the page components. The three entities below
            form the stable root of the schema graph. */}
        <JsonLd data={buildOrganization()} />
        <JsonLd data={buildPerson()} />
        <JsonLd data={buildWebSite()} />
      </body>
    </html>
  );
}
