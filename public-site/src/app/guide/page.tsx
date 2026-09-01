import { listPublicBusinessGuides } from "@/lib/db";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;
export const metadata: Metadata = { 
  title: "Garment Sourcing Guides & Industry Insights | Himat Textile", 
  description: "Access editorial guides and B2B apparel industry insights on starting a garment brand, wholesale buying patterns, and catalog sourcing logistics in Ahmedabad." 
};

export default async function BusinessGuidePage() {
  const guides = await listPublicBusinessGuides();
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#252525] selection:bg-[#FE6311] selection:text-white">
      <main>
        {/* Guide Hero */}
        <section className="relative overflow-hidden bg-[#252525] px-5 pb-12 pt-28 text-[#FAF9F6] sm:px-8 lg:px-12 lg:pt-36 border-b border-black/20">
          <div className="relative mx-auto max-w-[1280px]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-widest text-[#FFB51A]">
                <span>Home</span>
                <span className="opacity-50">/</span>
                <span className="text-[#FAF9F6]/80">Business Sourcing Guide</span>
              </div>
              <h1 className="font-serif-display text-[clamp(2.2rem,5.2vw,4.8rem)] font-black uppercase leading-[0.95] tracking-tight text-[#FAF9F6]">
                Garment Sourcing Intelligence.
              </h1>
              <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-[#FAF9F6]/85">
                Buying smart is the difference between profit and dead stock. Access our editorial guides, B2B procurement tips, and wholesale insights tailored for brand managers and retail purchasers.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[#DEDAD2] bg-[#FAF9F6] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 text-[#252525]">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-6 border-b border-[#DEDAD2] pb-7 lg:flex-row lg:items-end">
              <div>
                <span className="mono-label text-[9px] font-bold text-[#E94B0C] bg-[#FFF9E6] border border-[#FFB51A]/40 px-3.5 py-1.5 rounded-xs uppercase tracking-wider inline-block">
                  [ PRODUCT SELECTION / STOCK PLANNING / MARKET GUIDANCE ]
                </span>
                <div className="mt-4 h-0.5 bg-[#FE6311] w-12" />
                <h2 className="mt-6 font-serif-display text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl text-[#252525]">
                  Make smarter<br /><span className="italic font-normal text-[#FE6311]">buying decisions.</span>
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#6B6B6B]">Articles and resources for retailers, wholesalers, fashion brands and emerging labels navigating garment sourcing.</p>
            </div>
            {guides.length === 0 ? (
              <div className="py-16 text-center font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B]">No guides found.</div>
            ) : (
              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {guides.map((guide) => (
                  <article key={guide.id} className="group bg-[#FFFFFF] border border-[#DEDAD2] p-6 rounded-xs transition-all hover:border-[#FE6311] hover:shadow-xl shadow-xs sm:p-8">
                    {guide.coverImage && (
                      <div className="mb-7 aspect-video overflow-hidden bg-[#F3F1EC] rounded-xs">
                        <img src={guide.coverImage} alt={guide.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    )}
                    <span className="mono-label text-[8.5px] text-[#FE6311] font-bold uppercase bg-[#FFF9E6] border border-[#FFB51A]/40 px-2.5 py-1 rounded-xs">Published article</span>
                    <h3 className="mt-3 font-serif-display text-2xl font-bold uppercase leading-tight text-[#252525] group-hover:text-[#FE6311] transition-colors">{guide.title}</h3>
                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#6B6B6B]">{guide.content}</p>
                    <div className="mt-8 flex items-center justify-between border-t border-[#DEDAD2] pt-4">
                      <span className="mono-label text-[9px] font-mono text-[#6B6B6B] font-semibold">{guide.views} reads</span>
                      <Link href={`/guide/${guide.slug}`} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#252525] transition-colors hover:text-[#FE6311]">
                        Read guide <MoveRight size={12} className="text-[#FE6311]" />
                      </Link>
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




