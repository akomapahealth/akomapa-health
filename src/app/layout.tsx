import { Work_Sans, DM_Sans, Bree_Serif } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import { cn } from "@/lib/utils";
import { ThemeProvider } from '@/components/theme/ThemeProvider';

// Work Sans for headings
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["700"], // Bold weight
  variable: "--font-work-sans",
});

// DM Sans for subheadings and body
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular and Bold weights
  variable: "--font-dm-sans",
});

// Bree Serif for accents
const breeSerif = Bree_Serif({
  subsets: ["latin"],
  weight: ["400"], // Only comes in regular weight
  variable: "--font-bree-serif",
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
        workSans.variable,
        dmSans.variable,
        breeSerif.variable
      )}>
        <ThemeProvider defaultTheme="system" storageKey="akomapa-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}