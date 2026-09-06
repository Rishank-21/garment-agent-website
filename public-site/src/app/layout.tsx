import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { HimatHeader } from "@/components/HimatHeader";
import { HimatFooter } from "@/components/HimatFooter";
import BlackThemePreloader from "@/components/BlackThemePreloader";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/LanguageContext";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://himattextile.com"),
  title: {
    default: "Himat Textile | Premier Garment Sourcing & Wholesale Manufacturer Ahmedabad",
    template: "%s | Himat Textile",
  },
  description: "Himat Textile is a leading B2B garment sourcing, white labeling, and wholesale manufacturer in Ahmedabad, India. Supplying premium men's wear, women's wear, kids wear, ethnic apparel, mill direct fabrics, and bedsheets across India & globally.",
  keywords: [
    "Himat Textile",
    "Garment Manufacturer Ahmedabad",
    "Wholesale Clothing Supplier India",
    "B2B Apparel Sourcing",
    "White Label Clothing Manufacturer",
    "Cotton Fabric Ahmedabad",
    "Ahmedabad Cloth Market Wholesale",
    "Private Label Clothing India",
    "Garment Export India",
  ],
  authors: [{ name: "Himat Textile" }],
  creator: "Himat Textile",
  publisher: "Himat Textile",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://himattextile.com",
    title: "Himat Textile | Premier Garment Sourcing & Wholesale Partner",
    description: "Wholesale garment collections, white labeling, and mill direct fabrics from Ahmedabad, Gujarat.",
    siteName: "Himat Textile",
    images: [
      {
        url: "/images/himat_logo.png",
        width: 800,
        height: 600,
        alt: "Himat Textile Logo & Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Himat Textile | Garment Sourcing & Wholesale Ahmedabad",
    description: "B2B garment sourcing, white labeling & wholesale apparel manufacturer.",
    images: ["/images/himat_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://himattextile.com/#organization",
      "name": "Himat Textile",
      "url": "https://himattextile.com",
      "logo": "https://himattextile.com/images/himat_logo.png",
      "description": "Premier B2B garment sourcing, manufacturing, and wholesale supplier based in Ahmedabad, Gujarat, India.",
      "telephone": "+919873938095",
      "email": "contact@himattextile.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gheekanta, Ahmedabad",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat",
        "postalCode": "380001",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://wa.me/919873938095"
      ]
    },
    {
      "@type": "WholesaleStore",
      "@id": "https://himattextile.com/#localbusiness",
      "name": "Himat Textile",
      "image": "https://himattextile.com/images/himat_logo.png",
      "telephone": "+919873938095",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gheekanta, Old City",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat",
        "postalCode": "380001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.015093,
        "longitude": 72.592534
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:30",
          "closes": "19:30"
        }
      ]
    }
  ]
};

import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${playfair.variable} ${dmMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <LanguageProvider>
          <FirebaseAnalytics />
          <SmoothScroll>
            <div className="relative min-h-screen flex flex-col justify-between">
              <HimatHeader />
              <main className="flex-grow">{children}</main>
              <HimatFooter />
            </div>
            <FloatingWhatsApp />
            {/* <BlackThemePreloader /> */}
            <Toaster position="bottom-right" theme="dark" />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}


