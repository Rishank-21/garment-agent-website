"use client";

import React from "react";
import { ArrowUpRight, Instagram, Linkedin, Mail, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import HimatLogo from "@/components/HimatLogo";
import { useLanguage } from "@/lib/LanguageContext";

export function HimatFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-black/15 bg-[#d9d9d5] text-black">
      <div className="grid max-w-[1600px] grid-cols-1 gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.45fr_.75fr_.9fr] lg:px-12 lg:py-20">
        <div>
          <div className="mb-4">
            <HimatLogo light={true} className="h-20 w-auto -ml-3" />
          </div>
          <p className="max-w-sm text-sm leading-6 text-black/65">
            {t("foot_desc")}
          </p>
        </div>
        <div>
          <p className="mono-label mb-5 text-[10px] text-black/50 uppercase tracking-widest">{t("foot_quick_links")}</p>
          <div className="grid gap-3 text-sm font-semibold">
            <Link href="/about">{t("nav_about")}</Link>
            <Link href="/catalog">{t("nav_garments")}</Link>
            <Link href="/capabilities">{t("nav_capabilities")}</Link>
            <Link href="/network">{t("nav_network")}</Link>
            <Link href="/guide">{t("nav_guide")}</Link>
            <Link href="/#enquiry">{t("btn_start_enquiry")}</Link>
          </div>
        </div>
        <div>
          <p className="mono-label mb-5 text-[10px] text-black/50 uppercase tracking-widest">{t("foot_contact")}</p>
          <div className="grid gap-3 text-sm font-semibold">
            <div className="text-xs text-black/75 mb-2 leading-relaxed">
              <span className="font-mono text-[9px] uppercase text-black/50 block mb-1">Ahmedabad Office</span>
              {t("foot_address")}
            </div>
            
            <a className="flex items-center gap-2 hover:opacity-75" href="mailto:himmattextile@gmail.com">
              <Mail size={15} /> himmattextile@gmail.com
            </a>
            
            <a className="flex items-center gap-2 hover:opacity-75" href="tel:+919873938095">
              <Phone size={15} /> +91 98739 38095
            </a>

            <a className="flex items-center gap-2 hover:opacity-75" href="https://wa.me/919873938095" target="_blank" rel="noreferrer">
              <MessageSquare size={15} /> {t("btn_whatsapp_us")}
            </a>

            <div className="flex gap-3 pt-4">
              <a
                aria-label="LinkedIn contact"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center border border-black/40 hover:bg-black hover:text-white transition-colors"
              >
                <Linkedin size={15} />
              </a>
              <a
                aria-label="Instagram contact"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center border border-black/40 hover:bg-black hover:text-white transition-colors"
              >
                <Instagram size={15} />
              </a>
              <Link
                aria-label="Start an inquiry"
                href="/#enquiry"
                className="grid h-9 w-9 place-items-center border border-black/40 hover:bg-black hover:text-white transition-colors"
              >
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 border-t border-black/15 px-5 py-5 text-[10px] uppercase tracking-[.16em] text-black/50 sm:flex-row sm:px-8 lg:px-12">
        <span>© {new Date().getFullYear()} HIMAT TEXTILE. {t("foot_rights")}</span>
        <span>Ahmedabad, India · Sourcing · Wholesale · Private Label · Export</span>
      </div>
    </footer>
  );
}

