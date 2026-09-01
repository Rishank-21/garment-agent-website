import { Palette, Scissors, Tag, Truck } from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import type { Metadata } from "next";

export const metadata: Metadata = { 
  title: "Custom White Label Sourcing | Himat Textile", 
  description: "Build brand equity with customized garment lines under your own label through Himat Textile's sourcing and production network in Ahmedabad." 
};

const steps = [
  { step: "01", title: "Shape the concept", desc: "Share the product direction, target market, fits, quantities, and commercial intention behind your collection.", icon: Palette },
  { step: "02", title: "Develop the product", desc: "Work through fabric selection, product development, sampling, and the details that make the garment yours.", icon: Scissors },
  { step: "03", title: "Apply your brand", desc: "Coordinate woven labels, hang tags, polybag packaging, trims, and barcode requirements.", icon: Tag },
  { step: "04", title: "Prepare the order", desc: "Move from approved fit samples to bulk production planning, quality checks, and delivery coordination.", icon: Truck },
];

export default function WhiteLabelingPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#252525] selection:bg-[#FE6311] selection:text-white">
      <main>
        {/* White Labeling Hero */}
        <section className="relative overflow-hidden bg-[#252525] px-5 pb-16 pt-32 text-[#FAF9F6] sm:px-8 lg:px-12 lg:pb-24 lg:pt-40 border-b border-black/20">
          <div className="relative mx-auto max-w-[1500px]">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-widest text-[#FFB51A]">
                  <span>Home</span>
                  <span className="opacity-50">/</span>
                  <span>Services</span>
                  <span className="opacity-50">/</span>
                  <span className="text-[#FAF9F6]/80">White Labeling</span>
                </div>
                <h1 className="font-serif-display text-[clamp(2.2rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight text-[#FAF9F6]">
                  Your Brand.<br />
                  <span className="italic font-normal text-[#FE6311]">Your Vision.</span><br />
                  Our Manufacturing.
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-[#FAF9F6]/85 sm:text-base">
                  Bring your garment vision to life. From custom sizing and styling patterns to fabric sourcing and packaging under your own private label, we coordinate the manufacturing details.
                </p>
              </div>

              {/* Private Label Specifications Checklist */}
              <div className="border border-white/20 bg-white/5 p-6 rounded-xs space-y-4 shadow-xl">
                <span className="mono-label text-[9.5px] text-[#FFB51A] font-bold block">// MANUFACTURING SPECS</span>
                <div className="divide-y divide-white/15 text-xs">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#FAF9F6]/75">Available Lines:</span>
                    <span className="font-mono text-[#FAF9F6] font-bold">Cotton Pants, Linen Shirts, Kurtis, Co-ords, Kids Sets</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#FAF9F6]/75">Label Types:</span>
                    <span className="font-mono text-[#FAF9F6] font-bold">Satin print, Woven labels, Custom tags</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#FAF9F6]/75">Min. Order:</span>
                    <span className="font-mono text-[#FFB51A] font-bold">100 Pcs per design</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#FAF9F6]/75">Fabric Options:</span>
                    <span className="font-mono text-[#FAF9F6] font-bold">100% Cotton, Linen blends, Twill, Rayon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Step Process Section */}
        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#FFFFFF] text-[#252525] border-b border-[#DEDAD2]">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-6 border-b border-[#DEDAD2] pb-8 lg:flex-row lg:items-end">
              <div>
                <span className="mono-label text-[9px] font-bold text-[#E94B0C] bg-[#FFF9E6] border border-[#FFB51A]/40 px-3.5 py-1.5 rounded-xs uppercase tracking-wider inline-block">
                  [ MAKE YOUR OWN BRAND ]
                </span>
                <div className="mt-4 h-0.5 bg-[#FE6311] w-12" />
                <h2 className="mt-6 max-w-4xl font-serif-display text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl text-[#252525]">
                  A collection is more<br /><span className="italic font-normal text-[#FE6311]">than a product list.</span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[#6B6B6B]">Build a focused range of cotton twill pants, linen shirts, ethnic tops, ladies wear, kids wear, or a custom garment collection tailored for your retail market.</p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ step, title, desc, icon: Icon }) => (
                <article key={step} className="bg-[#FAF9F6] border border-[#DEDAD2] p-7 rounded-xs transition-all hover:border-[#FE6311] hover:shadow-xl shadow-xs">
                  <div className="flex items-center justify-between">
                    <Icon size={22} className="text-[#FE6311]" />
                    <span className="font-mono text-[10px] font-bold text-[#FE6311]">{step}</span>
                  </div>
                  <h3 className="mt-10 font-serif-display text-xl font-bold uppercase leading-tight text-[#252525]">{title}</h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#6B6B6B]">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Collaboration */}
        <section className="bg-[#252525] text-[#FAF9F6] px-5 py-20 sm:px-8 lg:px-12 lg:py-24 border-t border-black/20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2">
            <h2 className="font-serif-display text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl text-[#FAF9F6]">Custom design.<br /><span className="italic font-normal text-[#FE6311]">Fabric sourcing.</span><br />Production support.</h2>
            <div className="border-t border-white/15 pt-5 text-sm leading-relaxed text-[#FAF9F6]/85">
              <p>White labeling is a collaborative process. The final scope depends on the garment category, fabric, quantity, sampling requirements, branding details, and delivery plan.</p>
              <p className="mt-5 text-[#FAF9F6] font-bold">Bring your vision and we will help map the next practical step.</p>
            </div>
          </div>
        </section>
        <HimatInquiry />
      </main>
    </div>
  );
}




