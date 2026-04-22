/**
 * MetaGenerator
 * Converts a PageMeta object from any Laravel API response into a
 * Next.js Metadata object ready for generateMetadata().
 */

import type { Metadata } from "next";
import type { PageMeta } from "./api";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "TNT Creator Program";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tntcreators.com";

/**
 * Resolves a potentially relative image path to a full URL.
 * Laravel sometimes returns full URLs (http://127.0.0.1:8000/storage/...)
 * and sometimes relative paths. Both are handled.
 */
function resolveUrl(path?: string): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * Converts a raw PageMeta object into a Next.js Metadata object.
 * Falls back gracefully when fields are missing.
 */
export function generatePageMetadata(meta: PageMeta): Metadata {
  const ogImageUrl = resolveUrl(meta.og_image ?? meta.meta_image);
  const twitterImageUrl = resolveUrl(
    meta.twitter_image ?? meta.og_image ?? meta.meta_image,
  );
  const canonical = resolveUrl(meta.canonical_url);

  return {
    title: meta.meta_title ?? SITE_NAME,
    description: meta.meta_description,
    keywords: meta.meta_keywords,

    ...(canonical && { alternates: { canonical } }),

    openGraph: {
      title: meta.og_title ?? meta.meta_title ?? SITE_NAME,
      description: meta.og_description ?? meta.meta_description,
      type: (meta.og_type as "website" | "article") ?? "website",
      siteName: SITE_NAME,
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, alt: meta.og_title ?? SITE_NAME }],
      }),
    },

    twitter: {
      card:
        (meta.twitter_card as "summary_large_image" | "summary") ??
        "summary_large_image",
      title: meta.twitter_title ?? meta.og_title ?? meta.meta_title,
      description:
        meta.twitter_description ??
        meta.og_description ??
        meta.meta_description,
      ...(twitterImageUrl && { images: [twitterImageUrl] }),
    },
  };
}
