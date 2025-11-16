import { Inter, Poppins, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import { cn } from "@/lib/utils";
import { ThemeProvider } from '@/components/theme/ThemeProvider';

// Poppins for headings
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Inter for headings (alternative/fallback)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

// Source Sans 3 for body text
const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans-3",
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
        poppins.variable,
        inter.variable,
        sourceSans3.variable
      )}>
        <ThemeProvider defaultTheme="system" storageKey="akomapa-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}