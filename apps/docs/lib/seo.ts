import { Metadata } from "next";
import { componentsMetadata } from "./components-data";

/**
 * Base URL for the site
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL (custom domain)
 * 2. VERCEL_URL (automatic Vercel deployment URL)
 * 3. Localhost for development
 */
const getBaseUrl = () => {
  // Custom domain (highest priority)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Vercel automatic URL (production/preview)
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  // Fallback for local development
  return "http://localhost:3000";
};

const SITE_URL = getBaseUrl();

/**
 * Default SEO metadata for the site
 */
export const defaultMetadata: Metadata = {
  title: {
    default: "Inam UI - Premium React Component Library",
    template: "%s | Inam UI",
  },
  description:
    "A zero-dependency CLI for generating production-ready React components with TypeScript and Tailwind CSS. Beautiful, accessible, and fully customizable.",
  keywords: [
    "react",
    "components",
    "ui library",
    "tailwindcss",
    "typescript",
    "cli",
    "design system",
    "accessible",
    "open source",
  ],
  authors: [{ name: "Inam" }],
  creator: "Inam",
  publisher: "Inam",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Inam UI",
    title: "Inam UI - Premium React Component Library",
    description:
      "A zero-dependency CLI for generating production-ready React components with TypeScript and Tailwind CSS.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Inam UI - Premium React Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inam UI - Premium React Component Library",
    description:
      "A zero-dependency CLI for generating production-ready React components with TypeScript and Tailwind CSS.",
    images: [`${SITE_URL}/twitter-image.png`],
    creator: "@inambymk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

/**
 * Generate metadata for a component page
 */
export function generateComponentMetadata(slug: string): Metadata {
  const component = componentsMetadata.find((c) => c.slug === slug);

  if (!component) {
    return {
      title: "Component Not Found",
      description: "The requested component could not be found.",
    };
  }

  const title = `${component.name} Component`;
  const description = `${component.description} | React component with TypeScript and Tailwind CSS.`;
  const url = `${SITE_URL}/components/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `${component.name} - Inam UI`,
      description,
      url,
      type: "article",
      images: [
        {
          url: `${SITE_URL}/og-components/${slug}.png`,
          width: 1200,
          height: 630,
          alt: `${component.name} Component Preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${component.name} - Inam UI`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate JSON-LD structured data for a component
 */
export function generateComponentJsonLd(slug: string): object | null {
  const component = componentsMetadata.find((c) => c.slug === slug);

  if (!component) return null;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: `${component.name} Component`,
    description: component.description,
    programmingLanguage: ["TypeScript", "React"],
    runtimePlatform: "React",
    url: `${SITE_URL}/components/${slug}`,
    codeRepository: "https://github.com/inambymk/inam-ui",
    license: "https://opensource.org/licenses/MIT",
    creator: {
      "@type": "Organization",
      name: "Inam UI",
      url: SITE_URL,
    },
  };
}
