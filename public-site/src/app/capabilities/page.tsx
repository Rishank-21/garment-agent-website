import { Shield, Sparkles, Layers, Box } from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apparel Manufacturing Capabilities | Himat Textile",
  description: "Explore our garment production facilities, sizing tests, shrinkage checks, colorfastness standards, and bulk sourcing capabilities.",
};

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white selection:bg-white selection:text-black">
      <main className="pt-16 lg:pt-28">
        {/* Header */}
        <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 lg:px-12">
          <span className="mono-label text-[10px] text-white/50 uppercase">04 / Our Capabilities</span>
          <h1 className="mt-4 font-display text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl sm:leading-[0.85]">
            High-Scale Garment Production.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60">
            From yarn processing and knitting to precision garment tailoring, washing, and custom tag placement, we manage complex apparel workflows with speed and scale.
          </p>
        </section>

        {/* Details */}
        <section className="border-t border-white/10 py-16 bg-[#111]">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Fabric Processing", desc: "Sourcing high-grade cotton pique, single jersey, fleece, loopback, and slub denim, washed for low shrinkage.", icon: Layers },
              { title: "Stitching & Make", desc: "Advanced flatlock and double-needle lockstitch machines ensuring reinforced seams on knitwear and denim.", icon: Sparkles },
              { title: "Custom Dyeing", desc: "Industrial washing, enzyme treatments, vintage washes, and garment dyeing mapped to Pantone standards.", icon: Box },
              { title: "Quality Assurance", desc: "Piece-by-piece inspect cycles covering sizing specs, trim tension, loose threads, and packaging standards.", icon: Shield },
            ].map(item => (
              <div key={item.title} className="border border-white/10 bg-[#0d0d0d] p-6">
                <item.icon size={28} className="text-white/60" />
                <h3 className="mt-8 font-display text-lg font-black uppercase tracking-wider">{item.title}</h3>
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
