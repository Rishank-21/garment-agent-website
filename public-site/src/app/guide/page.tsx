import { listPublicBusinessGuides } from "@/lib/db";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";
import type { Metadata } from "next";

export const revalidate = 60;
export const metadata: Metadata = { title: "Garment Sourcing Guides & Industry Insights | Himat Textile", description: "Access editorial guides and B2B apparel industry insights on starting a garment brand, wholesale buying patterns, and catalog sourcing logistics." };

export default async function BusinessGuidePage() {
  const guides = await listPublicBusinessGuides();
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#C89A3D] selection:text-[#FFFFFF]">
      <main>
        <section className="relative overflow-hidden bg-[#0A1F2B] px-5 pb-8 pt-28 text-[#FFFFFF] sm:px-8 lg:px-12 lg:pt-36 border-b border-white/10">
          <div className="noise-layer absolute inset-0 opacity-5" />
          <div className="relative mx-auto max-w-[1280px]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#C89A3D]">
                <span>Home</span>
                <span className="opacity-50">/</span>
                <span className="text-white/60">Business Sourcing Guide</span>
              </div>
              <h1 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight text-white">
                Garment Sourcing Intelligence.
              </h1>
              <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-white/70">
                Buying smart is the difference between profit and dead stock. Access our editorial guides, B2B procurement tips, and wholesale insights tailored for brand managers and retail purchasers.
              </p>
            </div>
          </div>
        </section>

        <section className="paper-surface border-t border-[#E8E2D8] bg-[#FFFFFF] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 text-[#1A1A1A]">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-6 border-b border-[#E8E2D8] pb-7 lg:flex-row lg:items-end">
              <div>
                <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">// PRODUCT SELECTION / STOCK PLANNING / MARKET GUIDANCE</span>
                <div className="accent-rule mt-5 h-1 bg-[#C89A3D] w-12" />
                <h2 className="mt-7 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl text-[#0A1F2B]">Make smarter<br />buying decisions.</h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#667085]">Articles and resources for retailers, wholesalers, fashion brands and emerging labels navigating garment sourcing.</p>
            </div>
            {guides.length === 0 ? (
              <div className="py-16 text-center font-mono text-[10px] uppercase tracking-widest text-[#667085]">No guides found.</div>
            ) : (
              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {guides.map((guide) => (
                  <article key={guide.id} className="group bg-[#FFFFFF] border border-[#E8E2D8] p-6 rounded-xl transition-all hover:border-[#C89A3D] hover:shadow-lg sm:p-8">
                    {guide.coverImage && (
                      <div className="mb-7 aspect-video overflow-hidden bg-[#F6F3ED] rounded-xl">
                        <img src={guide.coverImage} alt={guide.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    )}
                    <span className="mono-label text-[9px] text-[#C89A3D] font-bold">Published article</span>
                    <h3 className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-[#0A1F2B]">{guide.title}</h3>
                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#667085]">{guide.content}</p>
                    <div className="mt-8 flex items-center justify-between border-t border-[#E8E2D8] pt-4">
                      <span className="mono-label text-[9px] text-[#667085]">{guide.views} reads</span>
                      <Link href={`/guide/${guide.slug}`} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A1F2B] transition-colors hover:text-[#C89A3D]">Read guide <MoveRight size={12} className="text-[#C89A3D]" /></Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
