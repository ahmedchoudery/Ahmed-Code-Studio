import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono, Syne, Space_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap'
});

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap'
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-label',
  display: 'swap'
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
  display: 'swap'
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmed-code-studio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Ahmed Code Studio — Full Stack Web Developer',
  description: 'Ahmed Code Studio — building premium web experiences with React, Next.js, Node.js, Three.js & GSAP. Full Stack Developer based in Pakistan.',
  keywords: ['Muhammad Ahmed Raza', 'Full Stack Developer', 'MERN Stack', 'React Developer', 'Next.js', 'Node.js', 'Web Developer Gujrat', 'Portfolio'],
  authors: [{ name: 'Muhammad Ahmed Raza', url: siteUrl }],
  creator: 'Muhammad Ahmed Raza',
  publisher: 'Muhammad Ahmed Raza',
  icons: {
    icon: '/favicon.svg',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    title: 'Ahmed Code Studio — Full Stack Web Developer',
    description: 'Ahmed Code Studio — building premium web experiences with React, Next.js, Node.js, Three.js & GSAP. Full Stack Developer based in Pakistan.',
    images: [{ url: 'https://ahmed-code-studio.vercel.app/og-image.jpg', width: 1200, height: 630, alt: 'Ahmed Code Studio — Full Stack Web Developer' }],
    siteName: 'Ahmed Code Studio',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Code Studio — Full Stack Web Developer',
    description: 'Ahmed Code Studio — building premium web experiences with React, Next.js, Node.js, Three.js & GSAP. Full Stack Developer based in Pakistan.',
    images: ['https://ahmed-code-studio.vercel.app/og-image.jpg'],
    creator: '@ahmedchoudery',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Muhammad Ahmed Raza",
    "jobTitle": "Full Stack Web Developer",
    "url": siteUrl,
    "image": `${siteUrl}/og-image.jpg`,
    "sameAs": [
      "https://github.com/ahmedchoudery",
      "https://www.linkedin.com/in/muhammad-ahmed-raza"
    ],
    "knowsAbout": ["Full Stack Development", "MERN Stack", "React.js", "Node.js", "TypeScript", "Three.js", "GSAP"],
    "description": "Full Stack Web Developer specializing in MERN stack applications, scalable Node.js backends, and high-performance React frontends.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gujrat",
      "addressCountry": "PK"
    }
  };

  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${syne.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#hero" className="skip-link">Skip to content</a>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script 
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive" 
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        {children}
      </body>
    </html>
  );
}
