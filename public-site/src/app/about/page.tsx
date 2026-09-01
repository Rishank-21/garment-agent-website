import { Building2, CheckCircle2, Factory, Files, UsersRound } from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Himat Textile â€” Sourcing & Manufacturing Heritage",
  description: "Learn about Himat Textile's capabilities, factory standards, quality control verification, and client-first garment sourcing process in Ahmedabad.",
};

const capabilities = [
  { icon: Factory, title: "Manufacturing dialogue", text: "A structured working conversation around garments, fabrics, and market requirements." },
  { icon: UsersRound, title: "Buyer-minded support", text: "Dedicated sourcing support for wholesalers, retailers, fashion brands, and emerging businesses." },
  { icon: Files, title: "Documentation awareness", text: "A structured process that surfaces relevant product, packaging, and export compliance details." },
  { icon: CheckCircle2, title: "Verification first", text: "Current mill certifications and factory information validated directly with Himat Textile." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#252525] selection:bg-[#FFB51A] selection:text-[#252525]">
      <main>
        {/* Header Hero */}
        <section className="relative overflow-hidden bg-[#141414] px-5 pb-16 pt-32 text-[#FAF8F5] sm:px-8 lg:px-12 lg:pb-24 lg:pt-40 border-b border-black/30">
          <div className="relative mx-auto max-w-[1500px]">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-widest text-[#FFB51A]">
                  <span>Home</span>
                  <span className="opacity-50">/</span>
                  <span>About Us</span>
                  <span className="opacity-50">/</span>
                  <span className="text-[#FAF8F5]/80">Heritage</span>
                </div>
                <h1 className="font-serif-display text-[clamp(2.2rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight text-[#FAF8F5]">
                  Two generations.<br />
                  <span className="italic font-normal text-[#FFB51A]">One trusted</span><br />
                  vision.
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-[#FAF8F5]/85 sm:text-base">
                  Built on trust, verified B2B relationships, and decades of textile operations in Ahmedabad. We bridge traditional B2B garment reliability with the fast-moving product demands of today's fashion entrepreneurs.
                </p>
              </div>
              <div className="relative aspect-video w-full overflow-hidden border border-white/20 bg-white/5 rounded-xs shadow-xl">
                <img src="/images/ahmedabad_market_gheekanta.jpg" alt="Himat Textile heritage" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 font-mono text-[9.5px] uppercase tracking-widest text-[#181511] bg-[#FFB51A] px-3.5 py-1.5 rounded-xs font-black shadow-md">
                  Ahmedabad Garment District
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#FFFFFF] text-[#252525] border-b border-[#E2DDD5]">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <span className="mono-label text-[9px] font-bold text-[#E94B0C] bg-[#FFF9E6] border border-[#FFB51A]/40 px-3.5 py-1.5 rounded-xs uppercase tracking-wider inline-block">
                [ STORY / NOT A SLOGAN ]
              </span>
              <div className="mt-4 h-0.5 bg-[#FFB51A] w-12" />
              <h2 className="mt-6 font-serif-display text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl text-[#252525]">
                Experience becomes more useful when it evolves.
              </h2>
            </div>
            <div className="space-y-5 text-sm leading-relaxed text-[#66625D] sm:text-base">
              <p>Himat Textile is positioned as a garment partner rather than simply a textile supplier. That distinction matters to buyers who need a structured conversation about products, categories, market positioning, and delivery expectations.</p>
              <p>The company story, facilities, capacity, and current credentials are confirmed from verified Himat Textile information. We focus on transparent B2B collaboration and continuous sourcing agility.</p>
              <div className="grid gap-4 border-t border-[#E2DDD5] pt-6 sm:grid-cols-3">
                <div className="border border-[#E2DDD5] bg-[#FAF9F6] p-4 rounded-xs text-center"><p className="font-serif-display text-3xl font-black text-[#252525]">02</p><p className="mono-label mt-1 text-[8.5px] font-bold text-[#FE6311] uppercase">Generations</p></div>
                <div className="border border-[#E2DDD5] bg-[#FAF9F6] p-4 rounded-xs text-center"><p className="font-serif-display text-3xl font-black text-[#252525]">01</p><p className="mono-label mt-1 text-[8.5px] font-bold text-[#FE6311] uppercase">Trusted vision</p></div>
                <div className="border border-[#E2DDD5] bg-[#FAF9F6] p-4 rounded-xs text-center"><p className="font-serif-display text-3xl font-black text-[#252525]">âˆž</p><p className="mono-label mt-1 text-[8.5px] font-bold text-[#FE6311] uppercase">Relationships</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="bg-[#141414] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 text-[#FAF8F5] border-t border-black/30">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-10 flex items-end justify-between border-b border-white/15 pb-5">
              <div>
                <span className="mono-label text-[9px] font-bold text-[#FFB51A] uppercase tracking-wider block">Capabilities / factory highlights</span>
                <h2 className="mt-4 font-serif-display text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl text-[#FAF8F5]">Verify the detail.<br /><span className="italic font-normal text-[#FFB51A]">Keep the vision.</span></h2>
              </div>
              <Building2 size={26} className="hidden text-[#FFB51A] sm:block" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {capabilities.map(({ icon: Icon, title, text }) => (
                <article key={title} className="bg-white/5 p-7 border border-white/15 rounded-xs transition-all hover:border-[#FFB51A] sm:p-9 shadow-xs">
                  <Icon size={22} className="text-[#FFB51A]" />
                  <h3 className="mt-8 font-serif-display text-2xl font-bold uppercase leading-tight text-[#FAF8F5]">{title}</h3>
                  <p className="mt-3 max-w-sm text-xs sm:text-sm leading-relaxed text-[#FAF8F5]/80">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Verification Evidence */}
        <section className="border-y border-[#E2DDD5] bg-[#FAF9F6] px-5 py-16 sm:px-8 lg:px-12 lg:py-24 text-[#252525]">
          <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <span className="mono-label text-[9px] font-bold text-[#E94B0C] uppercase tracking-wider bg-[#FFF9E6] border border-[#FFB51A]/40 px-3.5 py-1.5 rounded-xs inline-block">
                [ Certifications status ]
              </span>
              <h2 className="mt-4 font-serif-display text-3xl font-black uppercase leading-tight text-[#252525] sm:text-4xl">Evidence belongs in the buying file.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[['Current status','Confirm with Himat Textile'],['Buyer action','Request the relevant current certificates for your product and market.'],['Documentation','Verified files can be shared as part of the sourcing and compliance discussion.']].map(([label, text]) => (
                <div key={label} className="bg-white border border-[#E2DDD5] p-6 rounded-xs hover:border-[#FFB51A] transition-all hover:shadow-md shadow-xs">
                  <p className="mono-label text-[9px] font-bold text-[#FE6311] uppercase">{label}</p>
                  <p className="mt-4 font-serif-display text-base font-bold uppercase leading-snug text-[#252525]">{text}</p>
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

