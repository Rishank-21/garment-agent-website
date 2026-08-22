import { HimatInquiry } from "@/components/HimatInquiry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Private Label Sourcing | Himat Textile",
  description: "Build brand equity with customized garment lines under your own label. Low MOQ options, custom dyeing, and custom branding services.",
};

export default function PrivateLabelPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white selection:bg-white selection:text-black">
      <main className="pt-28">
        <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 lg:px-12">
          <span className="mono-label text-[10px] text-white/50 uppercase">05 / Custom Brand Solutions</span>
          <h1 className="mt-4 font-display text-5xl font-black uppercase tracking-tight sm:text-7xl">
            Private Label Sourcing.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60">
            Complete design-to-delivery support for brands looking to launch custom apparel lines. We handle technical pattern making, custom yarn dye, bulk stitching, and tagging.
          </p>
        </section>

        <section className="border-t border-white/10 py-16 bg-[#111]">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { step: "01", title: "Select Concept", desc: "Select from our structured fit catalog (slim fit, relaxed fit, oversized) or submit custom tech packs." },
                { step: "02", title: "Select Fabric", desc: "Choose fabric weights (220-400 GSM), organic blends, fleece, loopback, or custom washes." },
                { step: "03", title: "Apply Branding", desc: "Configure main labels, neck prints, customized hang tags, and custom embroidery or graphic printing." },
                { step: "04", title: "Production & Delivery", desc: "Our partners handle high-volume bulk stitching, QC inspection, and complete logistics packaging." }
              ].map(item => (
                <div key={item.step} className="border border-white/10 bg-[#0d0d0d] p-6 flex flex-col justify-between">
                  <div>
                    <span className="mono-label text-[11px] text-white/40">{item.step}</span>
                    <h3 className="mt-4 font-display text-xl font-black uppercase tracking-wider">{item.title}</h3>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-white/55">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HimatInquiry />
      </main>
    </div>
  );
}
