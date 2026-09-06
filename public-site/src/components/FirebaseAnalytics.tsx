"use client";

import { useEffect } from "react";
import Script from "next/script";
import { initAnalytics } from "@/lib/firebase";

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-C7V537BNC2";

export default function FirebaseAnalytics() {
  useEffect(() => {
    initAnalytics().catch((err) => {
      console.debug("[Firebase Analytics] init:", err);
    });
  }, []);

  if (!MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
