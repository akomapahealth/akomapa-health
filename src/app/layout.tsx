import localFont from "next/font/local";
import './globals.css';
import type { Metadata } from 'next';
import { cn } from "@/lib/utils";
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { MotionConfigProvider } from '@/components/motion/MotionConfigProvider';
import AnnouncementModal from '@/components/announcement/AnnouncementModal';
import { GoogleAnalytics } from '@next/third-parties/google';
import GlobalClickTracker from '@/components/analytics/GlobalClickTracker';
import { BRAND } from "@/config/brand";

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
  metadataBase: new URL('https://www.akomapahealth.org'),
  title: {
    default: `Akomapa Health - ${BRAND.tagline}`,
    template: '%s | Akomapa Health',
  },
  description: BRAND.description,
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
    url: 'https://www.akomapahealth.org/',
    title: `Akomapa Health - ${BRAND.tagline}`,
    description: BRAND.description,
    siteName: 'Akomapa Health',
  },
  twitter: {
    card: 'summary',
    title: `Akomapa Health - ${BRAND.tagline}`,
    description: BRAND.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        chillax.variable,
        plusJakartaSans.variable
      )}>
        <ThemeProvider defaultTheme="system" storageKey="akomapa-theme">
          <MotionConfigProvider>
            {children}
            <AnnouncementModal />
            <GlobalClickTracker />
          </MotionConfigProvider>
        </ThemeProvider>
      </body>
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </html>
  );
}
