import type { Metadata } from "next";
import { Manrope, Archivo_Black, DM_Mono } from "next/font/google";
import "./globals.css";
import { HimatHeader } from "@/components/HimatHeader";
import { HimatFooter } from "@/components/HimatFooter";
import CustomCursor from "@/components/CustomCursor";
import BlackThemePreloader from "@/components/BlackThemePreloader";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/LanguageContext";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Himat Textile — Garment Partner",
  description: "Himat Textile is a B2B garment partner for wholesale, private label and growing fashion businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${archivoBlack.variable} ${dmMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <LanguageProvider>
          <SmoothScroll>
            <div className="relative min-h-screen flex flex-col justify-between">
              <HimatHeader />
              <main className="flex-grow">{children}</main>
              <HimatFooter />
            </div>
            <CustomCursor />
            <BlackThemePreloader />
            <Toaster position="bottom-right" theme="dark" />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}

