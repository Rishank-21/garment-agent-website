"use client";

import React, { FormEvent, useState } from "react";
import { LoaderCircle, MoveUpRight, Phone } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/LanguageContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const requirementsOptions = [
  "Men's Wear",
  "Women's Wear",
  "Kids Wear",
  "Ethnic Wear",
  "Western Wear",
  "Bedsheets",
  "Fabrics Sourcing",
  "White Labeling",
];

const initialState = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  quantity: "",
  station: "",
  message: "",
};

export function HimatInquiry({
  initialMessage = "",
  initialProductInterest = "",
}: {
  initialMessage?: string;
  initialProductInterest?: string;
}) {
  const [form, setForm] = useState(initialState);
  const [selectedReqs, setSelectedReqs] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);
  const { language, t } = useLanguage();

  // Handle external configure/inquiry events and saved session requests
  React.useEffect(() => {
    const applyInquiryDetail = (detail: {
      requirement?: string;
      message?: string;
      categoryTitle?: string;
      variantName?: string;
    }) => {
      if (detail.requirement) {
        setSelectedReqs([detail.requirement]);
      }
      if (detail.message) {
        setForm((prev) => ({ ...prev, message: detail.message! }));
      }
      if (detail.categoryTitle) {
        toast.info(
          language === "hi"
            ? `${detail.categoryTitle} की जानकारी फॉर्म में भर दी गई है।`
            : `${detail.categoryTitle} details pre-filled in sourcing form.`
        );
      }
    };

    // 1. Check if there was a pending inquiry saved in sessionStorage
    try {
      const saved = sessionStorage.getItem("himat_pending_inquiry");
      if (saved) {
        const parsed = JSON.parse(saved);
        applyInquiryDetail(parsed);
        sessionStorage.removeItem("himat_pending_inquiry");
      }
    } catch {
      // ignore
    }

    // 2. Listen for live events fired from buttons on the same page
    const handleEvent = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail) {
        applyInquiryDetail(custom.detail);
      }
    };

    window.addEventListener("himat-fill-inquiry", handleEvent);
    return () => window.removeEventListener("himat-fill-inquiry", handleEvent);
  }, [language]);

  React.useEffect(() => {
    if (initialMessage) {
      setForm((prev) => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  React.useEffect(() => {
    if (initialProductInterest) {
      const interests = initialProductInterest.split(",").map((i) => i.trim().toLowerCase());
      const matched = requirementsOptions.filter((opt) =>
        interests.some((interest) => opt.toLowerCase().includes(interest) || interest.includes(opt.toLowerCase()))
      );
      if (matched.length > 0) {
        setSelectedReqs((prev) => Array.from(new Set([...prev, ...matched])));
      } else {
        setSelectedReqs((prev) => Array.from(new Set([...prev, "White Labeling"])));
      }
    }
  }, [initialProductInterest]);

  const toggleRequirement = (req: string) => {
    setSelectedReqs((prev) =>
      prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]
    );
  };

  const update = (name: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [name]: value }));

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (selectedReqs.length === 0) {
      toast.warning(language === "hi" ? "कृपया कम से कम एक गारमेंट आवश्यकता चुनें।" : "Please select at least one garment requirement.");
      return;
    }

    setIsPending(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          contactName: form.contactName || null,
          email: form.email || null,
          phone: form.phone || null,
          productInterest: selectedReqs.join(", "),
          station: form.station || null,
        }),
      });

      if (response.ok) {
        toast.success(language === "hi" ? "आपकी पूछताछ हिम्मत टेक्सटाइल द्वारा प्राप्त कर ली गई है।" : "Your enquiry has been received by Himat Textile.");
        setForm(initialState);
        setSelectedReqs([]);
      } else {
        const errorText = await response.text();
        toast.error(errorText || (language === "hi" ? "कुछ गलत हो गया।" : "Something went wrong."));
      }
    } catch (e) {
      toast.error(language === "hi" ? "पूछताछ सबमिट करने में विफल।" : "Failed to submit enquiry.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section id="enquiry" className="scroll-mt-28 bg-[#FAF8F5] px-5 py-20 text-[#171A1D] sm:px-8 lg:px-12 lg:py-28 border-t border-[rgba(23,26,29,0.12)]">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        {/* Info Column */}
        <div className="space-y-6">
          <span className="font-mono text-[10px] font-bold text-[#FE6311] uppercase tracking-wider bg-[#FFFAF4] px-3.5 py-1.5 rounded-[2px] inline-flex items-center gap-2 border border-[rgba(254,99,17,0.2)] shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FE6311]" />
            {t("enq_label")}
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-[0.92] tracking-tight text-[#171A1D]">
            {language === "hi" ? (
              <>आइए आपका<br /><em className="italic text-[#FE6311]">अगला कलेक्शन</em><br />बनाएं।</>
            ) : (
              <>Let&apos;s Build<br /><em className="italic text-[#FE6311]">Your Next</em><br />Collection.</>
            )}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-[#171A1D]/75">
            {t("enq_desc_p")}
          </p>

          <div className="flex flex-col gap-3 pt-6 border-t border-[rgba(23,26,29,0.12)]">
            <a
              href="https://wa.me/919873938095"
              target="_blank"
              rel="noreferrer"
              className="flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#171A1D] hover:text-[#FE6311] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" /> {t("whatsapp_chat_desk")}
            </a>
            <a
              href="tel:+919873938095"
              className="flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#171A1D] hover:text-[#FE6311] transition-colors"
            >
              <Phone size={16} className="text-[#FE6311]" /> {t("call_direct_desk")}
            </a>
          </div>
        </div>

        {/* Form Column - Human-friendly & clean */}
        <form onSubmit={onSubmit} className="grid gap-5 border-t-2 border-[#FE6311] pt-6 sm:grid-cols-2">
          <div className="sm:col-span-2 text-[11px] text-[#171A1D]/65 flex items-center gap-1.5 -mb-1">
            <span className="text-red-500 font-bold text-sm leading-none">*</span>
            <span>{language === "hi" ? "लाल तारांकित (*) फ़ील्ड भरना आवश्यक है" : "Fields marked with red asterisk (*) are required"}</span>
          </div>

          <Field
            label={t("enq_field_name")}
            value={form.contactName}
            onChange={(value) => update("contactName", value)}
            placeholder={language === "hi" ? "उदा. राजेश कुमार" : "e.g. Rajesh Kumar"}
          />
          <Field
            label={t("enq_field_company")}
            value={form.companyName}
            onChange={(value) => update("companyName", value)}
            required
            placeholder={language === "hi" ? "उदा. कुमार रिटेल्स" : "e.g. Kumar Retails or Brand Name"}
          />
          <Field
            label={t("enq_field_phone")}
            value={form.phone}
            onChange={(value) => update("phone", value)}
            required
            placeholder="e.g. +91 98739 38095"
          />
          <Field
            label={t("enq_field_email")}
            value={form.email}
            type="email"
            onChange={(value) => update("email", value)}
            placeholder="e.g. sourcing@company.com"
          />

          {/* Garment Requirements Multi-select Checklist */}
          <div className="sm:col-span-2 space-y-2">
            <span className="text-xs sm:text-[13px] font-semibold text-[#171A1D] flex items-center">
              <span>{t("enq_field_requirement").replace(/\s*\*/g, "").trim()}</span>
              <span className="text-red-500 font-bold ml-1 text-sm leading-none" title="Required field">*</span>
            </span>
            <p className="text-[11px] text-[#171A1D]/60 -mt-0.5 mb-1">
              {language === "hi" ? "एक या अधिक कैटिगरी चुनें:" : "Select one or more categories you need:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {requirementsOptions.map((req) => {
                const isSelected = selectedReqs.includes(req);
                return (
                  <button
                    suppressHydrationWarning={true}
                    key={req}
                    type="button"
                    onClick={() => toggleRequirement(req)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-[3px] border transition-all cursor-pointer select-none ${
                      isSelected
                        ? "bg-[#171A1D] text-[#FFFAF4] border-[#171A1D] shadow-sm -translate-y-0.5"
                        : "bg-[#FFFAF4] text-[#171A1D]/80 border-[rgba(23,26,29,0.15)] hover:border-[#FE6311] hover:text-[#FE6311] hover:bg-[#F3EEE5] shadow-2xs hover:-translate-y-0.5"
                    }`}
                  >
                    <span className="text-[#FFB51A] font-bold">{isSelected ? "✓" : "+"}</span>
                    <span>
                      {req === "Men's Wear" && language === "hi" ? "मेन्स वियर" :
                       req === "Women's Wear" && language === "hi" ? "महिला परिधान" :
                       req === "Kids Wear" && language === "hi" ? "बच्चों के कपड़े" :
                       req === "Ethnic Wear" && language === "hi" ? "एथनिक वियर" :
                       req === "Western Wear" && language === "hi" ? "वेस्टर्न वियर" :
                       req === "Bedsheets" && language === "hi" ? "बेडशीट्स" :
                       req === "Fabrics Sourcing" && language === "hi" ? "फैब्रिक्स सोर्सिंग" :
                       req === "White Labeling" && language === "hi" ? "व्हाइट लेबलिंग" : req}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="sm:col-span-2">
            <Field
              label={t("enq_field_station")}
              value={form.station}
              onChange={(value) => update("station", value)}
              required
              placeholder={t("enq_placeholder_station")}
            />
          </div>

          <label className="grid gap-1.5 sm:col-span-2">
            <span className="text-xs sm:text-[13px] font-semibold text-[#171A1D] flex items-center">
              <span>{t("enq_field_message").replace(/\s*\*/g, "").trim()}</span>
              <span className="text-red-500 font-bold ml-1 text-sm leading-none" title="Required field">*</span>
            </span>
            <textarea
              suppressHydrationWarning={true}
              required
              value={form.message}
              onChange={(event) => update("message", event.target.value)}
              minLength={10}
              placeholder={t("enq_placeholder_msg")}
              className="w-full min-h-28 rounded-[4px] border border-[rgba(23,26,29,0.16)] bg-[#FFFAF4] p-3.5 text-sm text-[#171A1D] placeholder:text-[#171A1D]/40 outline-none transition-all focus:border-[#FE6311] focus:ring-2 focus:ring-[#FE6311]/15 resize-y"
            />
          </label>

          <button
            suppressHydrationWarning={true}
            disabled={isPending}
            className="group mt-2 flex w-full items-center justify-center gap-2.5 bg-[#FE6311] hover:bg-[#E05307] text-[#FFFAF4] px-8 py-4 text-xs font-mono font-extrabold uppercase tracking-wider rounded-[4px] shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-60 sm:col-span-2 cursor-pointer"
          >
            <span>{isPending ? (language === "hi" ? "भेजा जा रहा है..." : "Sending...") : t("btn_send_enquiry")}</span>
            {isPending ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <MoveUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  const isMandatory = required || label.includes("*");
  const cleanLabel = label.replace(/\s*\*/g, "").trim();

  return (
    <label className="grid gap-1.5">
      <span className="text-xs sm:text-[13px] font-semibold text-[#171A1D] flex items-center">
        <span>{cleanLabel}</span>
        {isMandatory && (
          <span className="text-red-500 font-bold ml-1 text-sm leading-none" title="Required field">*</span>
        )}
      </span>
      <input
        suppressHydrationWarning={true}
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[4px] border border-[rgba(23,26,29,0.16)] bg-[#FFFAF4] px-3.5 py-3 text-sm text-[#171A1D] placeholder:text-[#171A1D]/40 outline-none transition-all focus:border-[#FE6311] focus:ring-2 focus:ring-[#FE6311]/15"
      />
    </label>
  );
}



