import { Palette, Scissors, Tag, Truck } from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Custom White Label Sourcing | Himat Textile", description: "Build brand equity with customized garment lines under your own label through Himat Textile's sourcing and production network." };

const steps = [
  { step: "01", title: "Shape the concept", desc: "Share the product direction, market, fit, quantity and commercial intention behind your collection.", icon: Palette },
  { step: "02", title: "Develop the product", desc: "Work through fabric selection, product development, sampling and the details that make the garment yours.", icon: Scissors },
  { step: "03", title: "Apply your brand", desc: "Coordinate labels, tags, packaging, trims and other branding requirements for your white labeling.", icon: Tag },
  { step: "04", title: "Prepare the order", desc: "Move from approved samples to production planning, quality checks and delivery coordination.", icon: Truck },
];

export default function WhiteLabelingPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#C89A3D] selection:text-[#FFFFFF]">
      <main>
        <section className="relative overflow-hidden bg-[#0A1F2B] px-5 pb-16 pt-32 text-[#FFFFFF] sm:px-8 lg:px-12 lg:pb-24 lg:pt-40 border-b border-white/10">
          <div className="noise-layer absolute inset-0 opacity-5" />
          <div className="relative mx-auto max-w-[1500px]">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#C89A3D]">
                  <span>Home</span>
                  <span className="opacity-50">/</span>
                  <span>Services</span>
                  <span className="opacity-50">/</span>
                  <span className="text-white/60">White Labeling</span>
                </div>
                <h1 className="font-display text-[clamp(2.2rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight text-white">
                  Your Brand.<br />
                  <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #FFFFFF" }}>Your Vision.</span><br />
                  Our Manufacturing.
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                  Bring your garment vision to life. From custom sizing and styling patterns to fabric sourcing and packaging under your own private label, we coordinate the manufacturing details.
                </p>
              </div>

              {/* Private Label Specifications Checklist */}
              <div className="border border-white/15 bg-[#122D3B] p-6 rounded-xl space-y-4 shadow-xl">
                <span className="mono-label text-[9px] text-[#C89A3D] block">// MANUFACTURING SPECS</span>
                <div className="divide-y divide-white/10 text-xs">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-white/60">Available Patterns:</span>
                    <span className="font-mono text-[#C89A3D]">Shirts, Pants, Kurtis, T-shirts</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-white/60">Label Types:</span>
                    <span className="font-mono text-[#C89A3D]">Satin print, Woven labels, Tags</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-white/60">Standard MOQ:</span>
                    <span className="font-mono text-[#C89A3D]">100 Pcs per design</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-white/60">Fabric Options:</span>
                    <span className="font-mono text-[#C89A3D]">100% Cotton, Linen blends, Rayon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="paper-surface px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#FFFFFF] text-[#1A1A1A]">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-6 border-b border-[#E8E2D8] pb-8 lg:flex-row lg:items-end">
              <div>
                <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">// MAKE YOUR OWN BRAND</span>
                <div className="accent-rule mt-5 h-1 bg-[#C89A3D] w-12" />
                <h2 className="mt-7 max-w-4xl font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl text-[#0A1F2B]">A collection is more<br />than a product list.</h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[#667085]">Build a focused range of cotton pants, shirts, T-shirts, ladies wear, kids wear or a custom garment collection around your customer and market.</p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ step, title, desc, icon: Icon }) => (
                <article key={step} className="bg-[#FFFFFF] border border-[#E8E2D8] p-7 rounded-xl transition-all hover:border-[#C89A3D] hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <Icon size={22} className="text-[#C89A3D]" />
                    <span className="font-mono text-[10px] text-[#667085]">{step}</span>
                  </div>
                  <h3 className="mt-16 font-display text-2xl font-bold uppercase leading-tight text-[#0A1F2B]">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#667085]">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0A1F2B] text-[#FFFFFF] px-5 py-20 sm:px-8 lg:px-12 lg:py-24 border-t border-[#E8E2D8]/10">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2">
            <h2 className="font-display text-3xl font-bold uppercase leading-none tracking-tight sm:text-5xl text-white">Custom design.<br />Fabric sourcing.<br />Production support.</h2>
            <div className="border-t border-white/10 pt-5 text-sm leading-relaxed text-[#FFFFFF]/70">
              <p>White labeling is a working process. The final scope depends on the garment category, fabric, quantity, sampling requirements, branding details and delivery plan.</p>
              <p className="mt-5 text-[#FFFFFF]/90">Bring your vision and we will help map the next practical step.</p>
            </div>
          </div>
        </section>
        <HimatInquiry />
      </main>
    </div>
  );
}
