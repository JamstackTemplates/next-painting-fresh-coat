import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/schibsted-grotesk';
import '@fontsource-variable/spline-sans-mono';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { asset } from '../lib/paths';
import { site } from '../lib/site';
import './tailwind.input.css';

const ogImage = asset('/og.png');
const description = site.description || business.introduction;

export const metadata: Metadata = {
  title: { default: business.name, template: `%s — ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: business.name,
    description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: `${business.name} — ${business.tagline}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: business.name,
    description,
    images: [ogImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <ThemeScript />
      </head>
      <body className="bg-bg text-ink antialiased">
        <ThemeProvider>
          <a className="skip-link" href="#main">Skip to content</a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
