"use client";

import React, { FormEvent, useState } from "react";
import { LoaderCircle, MoveUpRight, Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/LanguageContext";

const requirementsOptions = [
  "Men's Wear",
  "Women's Wear",
  "Kids Wear",
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
    <section id="enquiry" className="scroll-mt-28 bg-[#F6F3ED] px-5 py-20 text-[#1A1A1A] sm:px-8 lg:px-12 lg:py-28 border-t border-[#E8E2D8]">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        {/* Info Column */}
        <div className="space-y-6">
          <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">// {t("enq_label")}</span>
          <h2 className="font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-7xl sm:leading-[0.9] text-[#0A1F2B]">
            {language === "hi" ? (
              <>आइए आपका<br />अगला कलेक्शन<br />बनाएं।</>
            ) : (
              <>Let's Build<br />Your Next<br />Collection.</>
            )}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-[#667085]">
            {t("enq_desc_p")}
          </p>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#E8E2D8]">
            <a
              href="https://wa.me/919873938095"
              target="_blank"
              rel="noreferrer"
              className="flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#0A1F2B] hover:text-[#C89A3D] transition-colors"
            >
              <MessageSquare size={16} className="text-[#C89A3D]" /> {t("whatsapp_chat_desk")}
            </a>
            <a
              href="tel:+919873938095"
              className="flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#0A1F2B] hover:text-[#C89A3D] transition-colors"
            >
              <Phone size={16} className="text-[#C89A3D]" /> {t("call_direct_desk")}
            </a>
          </div>
        </div>

        {/* Form Column */}
        <form onSubmit={onSubmit} className="grid gap-6 border-t-2 border-[#0A1F2B] pt-6 sm:grid-cols-2">
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
            placeholder={language === "hi" ? "उदा. कुमार रिटेल्स लिमिटेड" : "e.g. Kumar Retails Ltd."}
          />
          <Field
            label={t("enq_field_email")}
            value={form.email}
            type="email"
            onChange={(value) => update("email", value)}
            placeholder="e.g. sourcing@company.com"
          />
          <Field
            label={t("enq_field_phone")}
            value={form.phone}
            onChange={(value) => update("phone", value)}
            required
            placeholder="e.g. +91 98739 38095"
          />

          {/* Garment Requirements Multi-select Checklist */}
          <div className="sm:col-span-2 space-y-3">
            <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">{t("enq_field_requirement")}</span>
            <div className="flex flex-wrap gap-2">
              {requirementsOptions.map((req) => {
                const isSelected = selectedReqs.includes(req);
                return (
                  <button
                    suppressHydrationWarning={true}
                    key={req}
                    type="button"
                    onClick={() => toggleRequirement(req)}
                    className={`border px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all rounded-md ${
                      isSelected
                        ? "bg-[#C89A3D] text-[#FFFFFF] border-[#C89A3D]"
                        : "bg-transparent text-[#1A1A1A] border-[#E8E2D8] hover:border-[#C89A3D]"
                    }`}
                  >
                    {req === "Men's Wear" && language === "hi" ? "मेन्स वियर (पुरुष परिधान)" :
                     req === "Women's Wear" && language === "hi" ? "महिला परिधान" :
                     req === "Kids Wear" && language === "hi" ? "बच्चों के कपड़े" :
                     req === "Bedsheets" && language === "hi" ? "बेडशीट्स" :
                     req === "Fabrics Sourcing" && language === "hi" ? "फैब्रिक्स सोर्सिंग" :
                     req === "White Labeling" && language === "hi" ? "व्हाइट लेबलिंग" : req}
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

          <label className="grid gap-2 sm:col-span-2">
            <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">{t("enq_field_message")}</span>
            <textarea
              suppressHydrationWarning={true}
              required
              value={form.message}
              onChange={(event) => update("message", event.target.value)}
              minLength={10}
              placeholder={t("enq_placeholder_msg")}
              className="min-h-32 resize-y border-b border-[#E8E2D8] bg-transparent py-3 text-sm outline-none placeholder:text-[#667085]/55 focus:border-[#C89A3D]"
            />
          </label>

          <button
            suppressHydrationWarning={true}
            disabled={isPending}
            className="group mt-2 flex w-full items-center justify-between bg-[#C89A3D] hover:bg-[#A9781D] px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[.15em] text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:col-span-2 rounded-md"
          >
            <span>{isPending ? (language === "hi" ? "भेजा जा रहा है..." : "Sending...") : t("btn_send_enquiry")}</span>
            {isPending ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <MoveUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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
  return (
    <label className="grid gap-2">
      <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">{label}</span>
      <input
        suppressHydrationWarning={true}
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="border-b border-[#E8E2D8] bg-transparent py-3 text-sm outline-none placeholder:text-[#667085]/55 focus:border-[#C89A3D]"
      />
    </label>
  );
}
