import Link from "next/link";
import { 
  Palette, 
  Scissors, 
  Tag, 
  Truck, 
  ArrowRight, 
  ArrowUpRight 
} from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import WhatsAppIcon from "@/components/WhatsAppIcon";
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#171A1D] selection:bg-[#FE6311] selection:text-[#FFFAF4]">
      <main>
        {/* White Labeling Hero */}
        <section className="relative overflow-hidden bg-[#F3EEE5] px-5 pb-16 pt-32 text-[#171A1D] sm:px-8 lg:px-12 lg:pb-24 lg:pt-36 border-b border-[rgba(23,26,29,0.12)]">
          <div className="relative mx-auto max-w-[1280px]">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-widest text-[#FE6311]">
                <Link href="/" className="hover:underline text-[#171A1D]/60 hover:text-[#FE6311] transition-colors">Home</Link>
                <span className="opacity-40 text-[#171A1D]/40">/</span>
                <span className="text-[#171A1D]/60">Services</span>
                <span className="opacity-40 text-[#171A1D]/40">/</span>
                <span className="text-[#171A1D] font-extrabold">White Labeling</span>
              </div>
              
              <h1 className="font-serif text-[clamp(2.4rem,6vw,5.5rem)] font-normal leading-[0.92] tracking-tight text-[#171A1D]">
                Your Brand.<br />
                <span className="italic font-normal text-[#FE6311]">Your Vision.</span><br />
                Our Manufacturing.
              </h1>
              
              <p className="max-w-2xl text-base sm:text-lg font-medium leading-relaxed text-[#171A1D]/85">
                Bring your garment vision to life. From custom sizing and styling patterns to fabric sourcing and packaging under your own private label, we coordinate every manufacturing detail in Ahmedabad.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#steps"
                  className="inline-flex items-center gap-2 bg-[#171A1D] hover:bg-[#2D3236] text-[#FFFAF4] px-6 py-3.5 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>HOW IT WORKS</span>
                  <ArrowRight size={14} />
                </a>
                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#171A1D] border border-[rgba(23,26,29,0.15)] px-6 py-3.5 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-2xs transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>START ENQUIRY</span>
                  <ArrowUpRight size={14} className="text-[#FE6311]" />
                </a>
                <a
                  href="https://wa.me/919873938095?text=Hello%20Himat%20Textile,%20I%20am%20interested%20in%20custom%20white-label%20garment%20manufacturing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3.5 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  <span>WHATSAPP US</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Step Process Section */}
        <section id="steps" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#FAF8F5] text-[#171A1D] border-b border-[rgba(23,26,29,0.12)]">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-6 border-b border-[rgba(23,26,29,0.12)] pb-8 lg:flex-row lg:items-end">
              <div>
                <span className="font-mono text-[9px] font-bold text-[#FE6311] bg-[#FFFFFF] border border-[rgba(23,26,29,0.1)] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block shadow-2xs">
                  [ MAKE YOUR OWN BRAND ]
                </span>
                <div className="mt-4 h-0.5 bg-[#FE6311] w-12" />
                <h2 className="mt-6 max-w-4xl font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[0.95] tracking-tight text-[#171A1D]">
                  A collection is more<br /><span className="italic text-[#FE6311]">than a product list.</span>
                </h2>
              </div>
              <p className="max-w-sm text-sm sm:text-base leading-relaxed text-[#171A1D]/70 font-sans">
                Build a focused range of cotton twill pants, linen shirts, ethnic tops, ladies wear, kids wear, or a custom garment collection tailored for your retail market.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ step, title, desc, icon: Icon }) => (
                <article 
                  key={step} 
                  className="bg-[#FFFFFF] border border-[rgba(23,26,29,0.12)] p-7 rounded-sm transition-all hover:border-[#FE6311] hover:shadow-lg shadow-2xs group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-md bg-[#F3EEE5] text-[#FE6311] group-hover:bg-[#FE6311] group-hover:text-white transition-colors">
                        <Icon size={20} />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#FE6311] bg-[#FE6311]/10 px-2.5 py-0.5 rounded-xs">{step}</span>
                    </div>
                    <h3 className="mt-8 font-serif text-xl sm:text-2xl font-normal leading-tight text-[#171A1D]">{title}</h3>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#171A1D]/70">{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Collaboration */}
        <section className="bg-[#171A1D] text-[#FAF8F5] px-5 py-20 sm:px-8 lg:px-12 lg:py-24 border-t border-[rgba(23,26,29,0.12)]">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="font-mono text-[10px] font-bold text-[#FE6311] uppercase tracking-widest block mb-3">// FLEXIBLE B2B VOLUME</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[0.95] tracking-tight text-[#FAF8F5]">
                Custom design.<br />
                <span className="italic text-[#FE6311]">Fabric sourcing.</span><br />
                Production support.
              </h2>
            </div>
            <div className="border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-10 space-y-5 text-sm sm:text-base leading-relaxed text-[#FAF8F5]/85">
              <p>
                White labeling is a collaborative process. The final scope depends on the garment category, fabric, quantity, sampling requirements, branding details, and delivery plan.
              </p>
              <p className="font-bold text-[#FAF8F5]">
                Bring your vision and we will help map the next practical step from pattern drafting to Pan-India dispatch.
              </p>
              <div className="pt-2">
                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-2 bg-[#FE6311] hover:bg-[#e0530b] text-white px-6 py-3 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-sm transition-all"
                >
                  <span>REQUEST PRIVATE LABEL QUOTE</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <div id="enquiry">
          <HimatInquiry />
        </div>
      </main>
    </div>
  );
}
