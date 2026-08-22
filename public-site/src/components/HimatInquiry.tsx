"use client";

import React, { FormEvent, useState } from "react";
import { LoaderCircle, MoveUpRight, Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const requirementsOptions = [
  "Men's Wear",
  "Women's Wear",
  "Kids Wear",
  "Wholesale Garments",
  "Private Label",
  "Export",
];

const initialState = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  quantity: "",
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
        setSelectedReqs((prev) => Array.from(new Set([...prev, "Private Label"])));
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
      toast.warning("Please select at least one garment requirement.");
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
        }),
      });

      if (response.ok) {
        toast.success("Your enquiry has been received by Himat Textile.");
        setForm(initialState);
        setSelectedReqs([]);
      } else {
        const errorText = await response.text();
        toast.error(errorText || "Something went wrong.");
      }
    } catch (e) {
      toast.error("Failed to submit enquiry.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section id="enquiry" className="bg-[#e7e7e4] px-5 py-16 text-black sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        {/* Info Column */}
        <div className="space-y-6">
          <span className="mono-label text-[10px] text-black/55 uppercase">08 / Begin a Sourcing Conversation</span>
          <h2 className="font-display text-5xl font-black uppercase leading-[0.88] tracking-[-.08em] sm:text-7xl">
            Let's Build<br />Your Next<br />Collection.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-black/65">
            Tell Himat Textile what you are building. Selecting your product lines and estimated order size helps our design and fabric teams prepare the right brief.
          </p>

          <div className="flex flex-col gap-3 pt-6 border-t border-black/10">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-wider text-black hover:opacity-75 transition-opacity"
            >
              <MessageSquare size={16} /> WhatsApp: Sourcing Chat ↗
            </a>
            <a
              href="tel:+919999999999"
              className="flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-wider text-black hover:opacity-75 transition-opacity"
            >
              <Phone size={16} /> Call: Direct Desk
            </a>
          </div>
        </div>

        {/* Form Column */}
        <form onSubmit={onSubmit} className="grid gap-6 border-t-2 border-black pt-6 sm:grid-cols-2">
          <Field
            label="Name / Contact Person"
            value={form.contactName}
            onChange={(value) => update("contactName", value)}
            placeholder="e.g. Rajesh Kumar"
          />
          <Field
            label="Business / Company name *"
            value={form.companyName}
            onChange={(value) => update("companyName", value)}
            required
            placeholder="e.g. Kumar Retails Ltd."
          />
          <Field
            label="Work email"
            value={form.email}
            type="email"
            onChange={(value) => update("email", value)}
            placeholder="e.g. sourcing@company.com"
          />
          <Field
            label="Phone Number *"
            value={form.phone}
            onChange={(value) => update("phone", value)}
            required
            placeholder="e.g. +91 99999 99999"
          />

          {/* Garment Requirements Multi-select Checklist */}
          <div className="sm:col-span-2 space-y-3">
            <span className="mono-label text-[10px] text-black/55 uppercase">Garment Requirements *</span>
            <div className="flex flex-wrap gap-2">
              {requirementsOptions.map((req) => {
                const isSelected = selectedReqs.includes(req);
                return (
                  <button
                    suppressHydrationWarning={true}
                    key={req}
                    type="button"
                    onClick={() => toggleRequirement(req)}
                    className={`border px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
                      isSelected
                        ? "bg-black text-white border-black"
                        : "bg-transparent text-black border-black/25 hover:border-black/60"
                    }`}
                  >
                    {req}
                  </button>
                );
              })}
            </div>
          </div>

          <Field
            label="Target Quantity *"
            value={form.quantity}
            onChange={(value) => update("quantity", value)}
            required
            placeholder="e.g. 500 units / style"
          />

          <label className="grid gap-2 sm:col-span-2">
            <span className="mono-label text-[10px] text-black/55 uppercase">Sourcing Message *</span>
            <textarea
              suppressHydrationWarning={true}
              required
              value={form.message}
              onChange={(event) => update("message", event.target.value)}
              minLength={10}
              placeholder="Provide context regarding material specifications, design tech packs, or delivery schedules."
              className="min-h-32 resize-y border-b border-black/35 bg-transparent py-3 text-sm outline-none placeholder:text-black/35 focus:border-black"
            />
          </label>

          <button
            suppressHydrationWarning={true}
            disabled={isPending}
            className="group mt-2 flex w-full items-center justify-between bg-black px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[.15em] text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:col-span-2"
          >
            <span>{isPending ? "Sending Inquiry" : "Send Inquiry Request"}</span>
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
      <span className="mono-label text-[10px] text-black/55 uppercase">{label}</span>
      <input
        suppressHydrationWarning={true}
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="border-b border-black/35 bg-transparent py-3 text-sm outline-none placeholder:text-black/35 focus:border-black"
      />
    </label>
  );
}
