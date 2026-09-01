import { Shield, Sparkles, Layers, Box } from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import type { Metadata } from "next";

export const metadata: Metadata = { 
  title: "Apparel Manufacturing Capabilities | Himat Textile", 
  description: "Explore Himat Textile's garment sourcing, white labeling, quality and manufacturing network capabilities in Ahmedabad." 
};

const capabilities = [
  { title: "Product sourcing", desc: "Find suitable garments based on product type, market, style, price range, and quantity requirement.", icon: Layers },
  { title: "Fabric selection", desc: "Explore multiple fabric options through textile mills, processing houses, and specialized fabric suppliers.", icon: Sparkles },
  { title: "Custom requirements", desc: "Coordinate white labeling, packaging, branding, sampling, and production requirements around your brief.", icon: Box },
  { title: "Quality focus", desc: "Keep sizing, shrinkage, colorfastness, construction, and packaging details visible in the sourcing conversation.", icon: Shield },
];

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#252525] selection:bg-[#FFB51A] selection:text-[#252525]">
      <main>
        {/* Header Hero */}
        <section className="relative overflow-hidden bg-[#141414] px-5 pb-16 pt-32 text-[#FAF8F5] sm:px-8 lg:px-12 lg:pb-24 lg:pt-40 border-b border-black/30">
          <div className="relative mx-auto max-w-[1500px]">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-widest text-[#FFB51A]">
                  <span>Home</span>
                  <span className="opacity-50">/</span>
                  <span>Capabilities</span>
                </div>
                <h1 className="font-serif-display text-[clamp(2.2rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight text-[#FAF8F5]">
                  Built Around<br />
                  <span className="italic font-normal text-[#FFB51A]">Your Garment</span><br />
                  Requirements.
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-[#FAF8F5]/85 sm:text-base">
                  Connecting B2B apparel brands with the right manufacturing and sourcing setups. We streamline fabric selection, styling verification, quality inspection, and transport logistics.
                </p>
              </div>

              {/* Technical Capability Summary */}
              <div className="border border-white/20 bg-white/5 p-6 rounded-xs space-y-4 shadow-xl">
                <span className="mono-label text-[9.5px] text-[#FFB51A] font-bold block">// OPERATIONS MATRIX</span>
                <div className="text-xs space-y-3">
                  <div className="flex justify-between border-b border-white/15 pb-2">
                    <span className="text-[#FAF8F5]/75">Yarn / Fabric:</span>
                    <span className="font-mono text-[#FAF8F5] font-bold">Cotton, Linen, Slub, Twill, Poly-Cotton</span>
                  </div>
                  <div className="flex justify-between border-b border-white/15 pb-2">
                    <span className="text-[#FAF8F5]/75">Finishing Focus:</span>
                    <span className="font-mono text-[#FAF8F5] font-bold">Soft washes, Bio-washing, Dyeing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#FAF8F5]/75">Logistics Handoff:</span>
                    <span className="font-mono text-[#FAF8F5] font-bold">Domestic & Global Sea Ports</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#FFFFFF] text-[#252525] border-b border-[#E2DDD5]">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-3xl">
              <span className="mono-label text-[9px] font-bold text-[#E94B0C] bg-[#FFF9E6] border border-[#FFB51A]/40 px-3.5 py-1.5 rounded-xs uppercase tracking-wider inline-block">
                [ HIMAT TEXTILE CAN SUPPORT ]
              </span>
              <div className="mt-4 h-0.5 bg-[#FFB51A] w-12" />
              <h2 className="mt-6 font-serif-display text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl text-[#252525]">
                From product idea<br /><span className="italic font-normal text-[#FE6311]">to buying decision.</span>
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#66625D]">The strongest sourcing conversations make the product, quantity, price, and delivery expectation clear before production begins.</p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map(({ title, desc, icon: Icon }, index) => (
                <article key={title} className="bg-[#FAF9F6] border border-[#E2DDD5] p-7 rounded-xs transition-all hover:border-[#FFB51A] hover:shadow-xl shadow-xs">
                  <div className="flex items-center justify-between">
                    <Icon size={22} className="text-[#FFB51A]" />
                    <span className="font-mono text-[10px] font-bold text-[#FE6311]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-10 font-serif-display text-xl font-bold uppercase leading-tight text-[#252525]">{title}</h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#66625D]">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Connection */}
        <section className="bg-[#141414] text-[#FAF8F5] px-5 py-20 sm:px-8 lg:px-12 lg:py-24 border-t border-black/30">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2">
            <div>
              <span className="mono-label text-[9px] font-bold text-[#FFB51A] uppercase tracking-wider block">Manufacturing connection</span>
              <h2 className="mt-4 font-serif-display text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl text-[#FAF8F5]">Relevant capability.<br /><span className="italic font-normal text-[#FFB51A]">Clear conversation.</span></h2>
            </div>
            <div className="border-t border-white/15 pt-5 text-sm leading-relaxed text-[#FAF8F5]/85">
              <p>We do not present every factory as owned or operated by Himat Textile. Instead, our network connects businesses with relevant sourcing and manufacturing capabilities based on their product requirements.</p>
              <p className="mt-5 text-[#FAF8F5] font-bold">That keeps the process practical, transparent, and aligned to the brief.</p>
            </div>
          </div>
        </section>
        <HimatInquiry />
      </main>
    </div>
  );
}

