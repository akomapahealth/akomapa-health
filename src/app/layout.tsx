import localFont from "next/font/local";
import './globals.css';
import { Metadata } from 'next';
import { cn } from "@/lib/utils";
import { ThemeProvider } from '@/components/theme/ThemeProvider';

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
  title: {
    default: 'Akomapa Health',
    template: '%s | Akomapa Health',
  },
  description: 'A healthcare-focused organization dedicated to improving health outcomes and access to quality healthcare.',
  keywords: ['healthcare', 'health foundation', 'medical programs', 'health education', 'community health'],
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
    title: 'Akomapa Health',
    description: 'Improving health outcomes and access to quality healthcare',
    siteName: 'Akomapa Health',
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
