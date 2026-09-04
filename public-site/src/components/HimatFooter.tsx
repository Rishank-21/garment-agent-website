"use client";

import React from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import HimatLogo from "@/components/HimatLogo";
import { useLanguage } from "@/lib/LanguageContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export function HimatFooter() {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-black/30 bg-[#141414] text-[#FAF8F5]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 py-14 sm:px-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.1fr] lg:gap-12 lg:px-12 lg:py-16">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-start">
            <HimatLogo light={false} stacked={false} size="lg" />
          </div>
          <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-[#FAF8F5]/70 font-sans">
            {t("foot_desc")}
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <p className="font-mono mb-4 text-[11px] text-[#FAF8F5]/40 uppercase tracking-[0.16em] font-semibold">
            {t("foot_quick_links")}
          </p>
          <div className="flex flex-col space-y-2.5 text-xs sm:text-sm text-[#FAF8F5]/75">
            <Link href="/about" className="hover:text-white transition-colors">{t("nav_about")}</Link>
            <Link href="/catalog" className="hover:text-white transition-colors">{t("nav_garments")}</Link>
            <Link href="/white-labeling" className="hover:text-white transition-colors">{t("nav_white_labeling")}</Link>
            <Link href="/network" className="hover:text-white transition-colors">{t("nav_network")}</Link>
            <Link href="/guide" className="hover:text-white transition-colors">{t("nav_guide")}</Link>
            <Link href="/reviews" className="hover:text-white transition-colors">{t("nav_reviews")}</Link>
            <Link href="/#enquiry" className="hover:text-white transition-colors">{t("btn_start_enquiry")}</Link>
          </div>
        </div>

        {/* Garment Categories Column */}
        <div>
          <p className="font-mono mb-4 text-[11px] text-[#FAF8F5]/40 uppercase tracking-[0.16em] font-semibold">
            {language === "hi" ? "गारमेंट श्रेणियां" : "GARMENT CATEGORIES"}
          </p>
          <div className="flex flex-col space-y-2.5 text-xs sm:text-sm text-[#FAF8F5]/75">
            <Link href="/catalog?category=mens-wear" className="hover:text-white transition-colors">{language === "hi" ? "मेंस वियर" : "Men's Wear"}</Link>
            <Link href="/catalog?category=womens-wear" className="hover:text-white transition-colors">{language === "hi" ? "विमेंस वियर" : "Women's Wear"}</Link>
            <Link href="/catalog?category=kids-wear" className="hover:text-white transition-colors">{language === "hi" ? "किड्स वियर" : "Kids Wear"}</Link>
            <Link href="/catalog?category=ethnic-wear" className="hover:text-white transition-colors">{language === "hi" ? "एथनिक वियर" : "Ethnic Wear"}</Link>
            <Link href="/catalog?category=bedsheets" className="hover:text-white transition-colors">{language === "hi" ? "बेडशीट्स और होम" : "Bedsheets & Home"}</Link>
            <Link href="/catalog?category=fabrics" className="hover:text-white transition-colors">{language === "hi" ? "फैब्रिक सोर्सिंग" : "Fabric Sourcing"}</Link>
            <Link href="/white-labeling" className="hover:text-white transition-colors">{language === "hi" ? "व्हाइट लेबलिंग" : "White Labelling"}</Link>
          </div>
        </div>

        {/* Contact Himat Textile Column */}
        <div>
          <p className="font-mono mb-4 text-[11px] text-[#FAF8F5]/40 uppercase tracking-[0.16em] font-semibold">
            {language === "hi" ? "हिम्मत टेक्सटाइल संपर्क" : "CONTACT HIMAT TEXTILE"}
          </p>
          <div className="flex flex-col space-y-3.5 text-xs sm:text-sm text-[#FAF8F5]/75">
            {/* Minimal clean address without boxes or colored tags */}
            <div className="leading-relaxed space-y-0.5">
              <p className="font-medium text-[#FAF8F5]">{language === "hi" ? "अहमदाबाद सोर्सिंग हब" : "Ahmedabad Sourcing Hub"}</p>
              <p>21, Hiralal Market, First Floor,</p>
              <p>Khatra Road, Ahmedabad,</p>
              <p>Gujarat, India</p>
            </div>

            {/* Highlighted Phone & Email */}
            <div className="flex flex-col space-y-2.5 pt-1 font-mono">
              <a
                className="group flex items-center gap-3 text-sm font-semibold text-[#FAF8F5] hover:text-[#FE6311] transition-colors"
                href="tel:+919873938095"
              >
                <span className="grid h-7 w-7 place-items-center rounded-[3px] bg-white/10 text-[#FE6311] group-hover:bg-[#FE6311] group-hover:text-white transition-colors shrink-0">
                  <Phone size={13} />
                </span>
                <span className="tracking-wide">+91 98739 38095</span>
              </a>

              <a
                className="group flex items-center gap-3 text-sm font-semibold text-[#FAF8F5] hover:text-[#FE6311] transition-colors"
                href="mailto:himattextile@gmail.com"
              >
                <span className="grid h-7 w-7 place-items-center rounded-[3px] bg-white/10 text-[#FE6311] group-hover:bg-[#FE6311] group-hover:text-white transition-colors shrink-0">
                  <Mail size={13} />
                </span>
                <span className="tracking-wide">himattextile@gmail.com</span>
              </a>
            </div>

            {/* Clean WhatsApp Button */}
            <div className="pt-2">
              <a
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-[3px] font-mono text-xs font-bold tracking-wider transition-colors shadow-sm"
                href="https://wa.me/919873938095?text=Hello%20Himat%20Textile,%20I%20am%20looking%20for%20garment%20sourcing%20in%20Ahmedabad"
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{language === "hi" ? "व्हाट्सएप करें" : "WHATSAPP US"}</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/10 bg-[#0E0E0E] px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left text-[10px] uppercase tracking-[0.14em] text-[#FAF8F5]/40 font-mono">
          <span>© {new Date().getFullYear()} HIMAT TEXTILE. {t("foot_rights")}</span>
          <span>{language === "hi" ? "अहमदाबाद सोर्सिंग हब · गुजरात, भारत" : "Ahmedabad Sourcing Hub · Gujarat, India"}</span>
        </div>
      </div>
    </footer>
  );
}
