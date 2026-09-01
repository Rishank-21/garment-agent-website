import { getBusinessGuideBySlug, recordGuideView } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { HimatInquiry } from "@/components/HimatInquiry";
import type { Metadata } from "next";

export const revalidate = 60;
interface GuideDetailsProps { params: Promise<{ slug: string }>; }
export async function generateMetadata({ params }: GuideDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getBusinessGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found | Himat Textile" };
  return {
    title: `${guide.title} | Himat Textile Sourcing Guide`,
    description: `${guide.content.substring(0, 155)}...`
  };
}

export default async function GuideDetailsPage({ params }: GuideDetailsProps) {
  const { slug } = await params;
  if (!slug) notFound();
  const guide = await getBusinessGuideBySlug(slug);
  if (!guide) notFound();
  await recordGuideView(slug);

  return (
    <div className="min-h-screen bg-[#F8F4EF] text-[#1C1917] selection:bg-[#5C0A0A] selection:text-[#F8F4EF]">
      <main>
        {/* Article Header */}
        <section className="bg-[#5C0A0A] px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-40 text-[#F8F4EF] border-b border-[#7A1010]">
          <div className="mx-auto max-w-[1000px]">
            <Link href="/guide" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F8F4EF]/70 transition-colors hover:text-[#B8924A]">
              <ArrowLeft size={12} /> Back to sourcing guide
            </Link>
            <div className="mt-10">
              <span className="mono-label text-[9.5px] text-[#B8924A] bg-white/10 px-3 py-1 rounded-xs uppercase tracking-widest font-bold">Himat Textile / Business Sourcing Guide</span>
              <div className="mt-4 h-0.5 w-16 bg-[#B8924A]" />
              <h1 className="mt-6 font-serif-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.92] tracking-tight text-[#F8F4EF]">{guide.title}</h1>
              <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-white/15 py-3 font-mono text-[10px] uppercase tracking-wider text-[#F8F4EF]/70">
                <span>Published in Ahmedabad, India</span>
                <span className="text-[#B8924A]">◆</span>
                <span>{guide.views + 1} views</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="bg-[#F8F4EF] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[900px]">
            {guide.coverImage && (
              <div className="mb-12 aspect-video w-full overflow-hidden bg-[#FFFFFF] border border-[#E5DDD3] rounded-xs shadow-md">
                <img src={guide.coverImage} alt={guide.title} className="h-full w-full object-cover" />
              </div>
            )}
            <article className="space-y-6 text-base leading-8 text-[#6B625B] sm:text-lg">
              {guide.content.split("\n\n").map((para, i) => (
                <p key={i} className="leading-relaxed">{para}</p>
              ))}
            </article>
            <div className="mt-14 border-t border-[#E5DDD3] pt-6">
              <Link href="/#enquiry" className="burgundy-button inline-flex items-center gap-2 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.16em] rounded-xs shadow-md">
                Talk to our garment team <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>
        <HimatInquiry />
      </main>
    </div>
  );
}



