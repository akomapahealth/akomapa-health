import localFont from "next/font/local";
import './globals.css';
import type { Metadata } from 'next';
import { cn } from "@/lib/utils";
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { MotionConfigProvider } from '@/components/motion/MotionConfigProvider';
import { AnnouncementProvider } from '@/components/announcement/AnnouncementProvider';
import { GoogleAnalytics } from '@next/third-parties/google';
import DeferredGlobalWidgets from '@/components/global/DeferredGlobalWidgets';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const chillax = localFont({
  src: [
    {
      path: "../fonts/chillax/Chillax-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/chillax/Chillax-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-chillax",
  display: "swap",
});

const plusJakartaSans = localFont({
  src: [
    {
      path: "../fonts/plus-jakarta-sans/PlusJakartaSans-Latin.woff2",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Akomapa Health',
    default: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'global health leadership',
    'ethical health leaders',
    'community-driven healthcare',
    'leadership education',
    'health equity',
    'global health research',
    'equitable partnerships',
    'non-communicable diseases',
  ],
  authors: [{ name: 'Akomapa Health' }],
  creator: 'Akomapa Health',
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: DEFAULT_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteJsonLd = [buildOrganizationJsonLd(), buildWebsiteJsonLd()];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(siteJsonLd),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          chillax.variable,
          plusJakartaSans.variable
        )}
      >
        <ThemeProvider defaultTheme="system" storageKey="akomapa-theme">
          <MotionConfigProvider>
            <AnnouncementProvider>
              {children}
              <DeferredGlobalWidgets />
            </AnnouncementProvider>
          </MotionConfigProvider>
        </ThemeProvider>
      </body>
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </html>
  );
}
