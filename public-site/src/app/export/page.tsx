import { ShieldCheck } from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "International Apparel Export Capacity | Himat Textile",
  description: "We manage international garment shipments, ensuring export quality testing, custom cargo packaging, and customs documentation.",
};

export default function ExportPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white selection:bg-white selection:text-black">
      <main className="pt-28">
        <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 lg:px-12">
          <span className="mono-label text-[10px] text-white/50 uppercase">08 / Export Capacity</span>
          <h1 className="mt-4 font-display text-5xl font-black uppercase tracking-tight sm:text-7xl">
            Apparel Export Sourcing.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60">
            Reliable logistics support, strict quality verification, custom packaging, and comprehensive export documentation for overseas buyers.
          </p>
        </section>

        <section className="border-t border-white/10 py-16 bg-[#111]">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 grid gap-6 sm:grid-cols-2">
            {[
              { title: "Quality Verification", desc: "Every export consignment undergoes shrinkage testing, color fastness evaluations, fabric GSM validation, and flat seam checks before leaving the factory floor." },
              { title: "Export Logistics & Customs", desc: "We coordinate with shipping agents, handle customs filing documentation in India, and provide bill of lading assistance to simplify import processes at destination ports." },
              { title: "Secure Packaging", desc: "Export garments are packed inside double-walled corrugated cartons with inner moisture-resistant bags, individually polybagged, and barcoded per design specs." },
              { title: "Bulk Contract Sourcing", desc: "High-scale container volume contracts (FCL/LCL) optimized for sea freight schedules, providing wholesale buyers with clear delivery timelines." }
            ].map(item => (
              <div key={item.title} className="border border-white/10 bg-[#0d0d0d] p-6">
                <ShieldCheck size={24} className="text-white/60" />
                <h3 className="mt-6 font-display text-lg font-black uppercase tracking-wider">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/55">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <HimatInquiry />
      </main>
    </div>
  );
}
