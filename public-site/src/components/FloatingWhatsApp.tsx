"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function FloatingWhatsApp() {
  const { language } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);

  // Appear after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-show tooltip after 5 seconds
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setShowTooltip(true), 5000);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-2">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="relative flex flex-col items-end animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white border border-[#DEDAD2] rounded-xs shadow-xl p-4 max-w-[220px] text-right relative">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 left-2 text-[#6B6B6B] hover:text-[#252525]"
              aria-label="Close tooltip"
            >
              <X size={14} />
            </button>
            <p className="text-[11px] font-bold text-[#252525] leading-snug">
              {language === "hi" ? "हमसे बात करें!" : "Talk to us!"}
            </p>
            <p className="text-[10px] text-[#6B6B6B] mt-0.5 leading-relaxed">
              {language === "hi"
                ? "तुरंत कोटेशन पाने के लिए संदेश करें।"
                : "Message us for an instant garment sourcing quote."}
            </p>
            <div className="mt-2 w-full h-px bg-[#DEDAD2]" />
            <p className="text-[9px] font-mono text-[#FE6311] font-bold uppercase tracking-wider mt-1.5">
              +91 98739 38095
            </p>
          </div>
          {/* Arrow */}
          <div className="w-3 h-3 bg-white border-b border-r border-[#DEDAD2] rotate-45 mr-5 -mt-1.5 shadow-sm" />
        </div>
      )}

      {/* Main WhatsApp Button */}
      <a
        href="https://wa.me/919873938095"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Himat Textile on WhatsApp"
        className="group relative flex items-center gap-2.5 rounded-full bg-[#25D366] px-4.5 py-3 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a] hover:shadow-[0_8px_24px_rgba(37,211,102,0.4)]"
        onClick={() => setShowTooltip(false)}
      >
        <WhatsAppIcon className="w-5 h-5 fill-white" />
        <span className="font-sans text-xs font-bold uppercase tracking-wider hidden sm:inline-block">
          {language === "hi" ? "व्हाट्सएप" : "WhatsApp"}
        </span>
      </a>
    </div>
  );
}
