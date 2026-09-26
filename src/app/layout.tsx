import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { getSiteUrl } from "@/lib/content";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: "Tarun Bagewadi — Backend & AI Software Engineer", template: "%s — Tarun Bagewadi" },
  description: "Backend systems, applied AI, and thoughtful software. Explore Tarun Bagewadi’s work on LedgerGuard, VisSeqBench, ContractIQ, and Events Around.",
  openGraph: { type: "website", siteName: "Tarun Bagewadi", locale: "en_US" },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><MotionProvider><a href="#main" className="skip-link">Skip to content</a><Header />{children}<Footer /></MotionProvider></body></html>;
}
