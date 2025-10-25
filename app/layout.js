import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Ribbon from "./components/Ribbon";
import Script from 'next/script';
import Image from 'next/image';
import { Suspense } from 'react';
import BrowserExtensionCleanup from './components/BrowserExtensionCleanup';
import ClarityTracking from './components/ClarityTracking';
import FacebookPixel from './components/FacebookPixel';
import MetaProvider from './components/MetaProvider';
import AccessibilityAxe from './components/AccessibilityAxe';

const SITE_URL = process.env.SITE_URL || 'https://amariuc.netlify.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Bipolar Depression Research Study | Stone Mountain",
  description: "Find hope when depression feels overwhelming. Up to $1,500 compensation and free round-trip Uber transportation. A research study for people living with bipolar depression.",
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png'
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Bipolar Depression Research Study | Stone Mountain",
    description: "A study for people living with bipolar depression. Up to $1,500 compensation and free Uber rides to every visit.",
    url: '/',
    siteName: 'Stone Mountain Bipolar Research',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'A doctor and patient discussing bipolar depression research study options.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bipolar Depression Research Study | Stone Mountain",
    description: "Up to $1,500 compensation and free Uber transportation. A study for bipolar depression.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Bipolar Depression Research Study | Stone Mountain",
    "description": "Find hope when depression feels overwhelming. Up to $1,500 compensation and free round-trip Uber transportation.",
    "url": SITE_URL,
    "publisher": {
      "@type": "Organization",
      "name": "Stone Mountain Bipolar Research",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preload" as="image" href="/hero.png" fetchPriority="high" />
        <link rel="icon" href="/icon.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/icon.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png?v=2" />
        <link
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        
        {/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
                `
              }}
            />
          </>
        )}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "Stone Mountain Bipolar Research",
                  "url": SITE_URL,
                  // Optional: Add logo, address, telephone etc.
                  // "logo": "URL_TO_YOUR_LOGO.png",
                  // "address": {
                  //   "@type": "PostalAddress",
                  //   "streetAddress": "...",
                  //   "addressLocality": "...",
                  //   "addressRegion": "...",
                  //   "postalCode": "...",
                  //   "addressCountry": "..."
                  // },
                  // "telephone": "+1-XXX-XXX-XXXX"
                },
                {
                  "@type": "MedicalWebPage",
                  "@id": SITE_URL,
                  "url": SITE_URL,
                  "name": "Bipolar Depression Research Study | Stone Mountain",
                  "description": "A research study for people living with bipolar depression. Up to $1,500 compensation and free Uber transportation.",
                  "publisher": {
                    "@type": "Organization",
                    "name": "Stone Mountain Bipolar Research"
                  },
                  "inLanguage": "en-US"
                }
              ]
            }),
          }}
        />
      </head>
      <body className="antialiased bg-white-soft text-text-main font-body scroll-smooth" suppressHydrationWarning>
        <a href="#main" className="skip-link">Skip to main content</a>
        <BrowserExtensionCleanup />
        <ClarityTracking />
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <MetaProvider>
          <Ribbon />
          <Navbar />
          <main id="main" tabIndex="-1">
            {children}
          </main>
        </MetaProvider>
        <AccessibilityAxe />
      </body>
    </html>
  );
}
