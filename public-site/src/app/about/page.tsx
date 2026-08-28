import { Building2, CheckCircle2, Factory, Files, UsersRound } from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Himat Textile — Sourcing & Manufacturing History",
  description: "Learn about Himat Textile's capabilities, factory standards, quality control verification, and our client-first garment sourcing process.",
};

const capabilities = [
  { icon: Factory, title: "Manufacturing dialogue", text: "A structured working conversation around garments, fabrics and market requirements." },
  { icon: UsersRound, title: "Buyer-minded support", text: "Support for wholesalers, retailers, fashion brands and emerging businesses." },
  { icon: Files, title: "Documentation awareness", text: "A process that can surface the relevant product, packaging or export details for your brief." },
  { icon: CheckCircle2, title: "Verification first", text: "Current certifications and factory information can be supplied and validated directly with Himat Textile." }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white selection:bg-white selection:text-black">
      <main className="pt-16 lg:pt-28">
        {/* Banner Section - Upgraded to Dark Premium Theme */}
        <section className="relative overflow-hidden bg-[#0a0a0a] border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="absolute inset-0 noise-layer bg-[#0a0a0a]" />
          <img
            src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200"
            alt="Textile making"
            className="absolute right-0 top-0 h-full w-1/2 object-cover grayscale opacity-15 mix-blend-screen pointer-events-none"
          />
          <div className="relative mx-auto max-w-[1440px] z-10">
            <p className="mono-label mb-5 text-[10px] text-white/50 tracking-widest uppercase">About Himat Textile</p>
            <h1 className="font-display max-w-5xl text-6xl font-black uppercase leading-none tracking-[-0.1em] sm:text-8xl sm:leading-[.78] text-white">
              A garment<br />business built<br />on context.
            </h1>
            <p className="mt-10 max-w-xl text-sm leading-relaxed text-white/70">
              Himat Textile brings a second-generation perspective to garment manufacturing and wholesale: listening carefully to the business need, clarifying the commercial path and building a sourcing conversation that can move forward.
            </p>
          </div>
        </section>

        {/* Story Section - Restyled to match dark theme */}
        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24 bg-[#0d0d0d]">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2">
            <div>
              <p className="mono-label mb-5 text-[10px] text-white/40 tracking-widest uppercase">Story / not a slogan</p>
              <h2 className="font-display text-5xl font-black uppercase leading-none tracking-[-.09em] sm:text-7xl sm:leading-[.82] text-white">
                Experience becomes more useful when it evolves.
              </h2>
            </div>
            <div className="space-y-6 text-sm leading-relaxed text-white/60">
              <p>
                Himat Textile is positioned as a garment partner rather than simply a textile supplier. That distinction matters to buyers who need a conversation about products, categories, market positioning and delivery expectations.
              </p>
              <p>
                The company story, facilities, capacity and current credentials should be confirmed from verified Himat Textile information. This platform intentionally makes no unsupported claims about years in business, production output, factory locations or certifications.
              </p>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="bg-[#111111] border-t border-white/10 px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-10 flex items-end justify-between border-b border-white/15 pb-5">
              <div>
                <p className="mono-label mb-4 text-[10px] text-white/40 tracking-widest uppercase">Capabilities and factory highlights</p>
                <h2 className="font-display text-5xl font-black uppercase leading-none tracking-[-.09em] sm:text-7xl sm:leading-[.82]">
                  Verify the detail.<br />Keep the vision.
                </h2>
              </div>
              <Building2 size={26} className="hidden text-white/40 sm:block"/>
            </div>
            <div className="grid gap-px bg-white/10 sm:grid-cols-2">
              {capabilities.map(item => (
                <article key={item.title} className="bg-[#161616] p-6 sm:p-8 hover:bg-[#1c1c1c] transition-colors duration-300">
                  <item.icon size={20} className="text-white/50"/>
                  <h3 className="mt-16 font-display text-3xl font-black uppercase leading-none tracking-[-.07em] sm:leading-[.9]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section - Restyled to dark grid */}
        <section className="border-y border-white/10 bg-[#0d0d0d] px-5 py-14 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="mono-label mb-4 text-[10px] text-white/45 tracking-widest uppercase">Certifications status</p>
              <h2 className="font-display text-4xl font-black uppercase leading-none tracking-[-.08em] sm:text-5xl sm:leading-[.86] text-white">
                Evidence belongs in the buying file.
              </h2>
            </div>
            <div className="grid gap-px bg-white/10 sm:grid-cols-3">
              <div className="bg-[#111111] p-6">
                <p className="mono-label text-[10px] text-white/40 tracking-widest uppercase">Current status</p>
                <p className="mt-8 font-display text-xl font-black uppercase leading-[.9] tracking-[-.06em] text-white">
                  Confirm with Himat Textile
                </p>
              </div>
              <div className="bg-[#111111] p-6">
                <p className="mono-label text-[10px] text-white/40 tracking-widest uppercase">Buyer action</p>
                <p className="mt-8 text-sm leading-relaxed text-white/60">
                  Request the relevant current certificates for your product and market.
                </p>
              </div>
              <div className="bg-[#111111] p-6">
                <p className="mono-label text-[10px] text-white/40 tracking-widest uppercase">Documentation</p>
                <p className="mt-8 text-sm leading-relaxed text-white/60">
                  Verified files can be shared as part of the sourcing and compliance discussion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <HimatInquiry />
      </main>
    </div>
  );
}
