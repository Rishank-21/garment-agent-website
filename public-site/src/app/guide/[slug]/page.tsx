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
    <div className="min-h-screen bg-[#FAF8F5] text-[#171A1D] selection:bg-[#FE6311] selection:text-[#FFFAF4]">
      <main>
        {/* Article Header */}
        <section className="bg-[#F3EEE5] px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-20 lg:pt-36 text-[#171A1D] border-b border-[rgba(23,26,29,0.12)]">
          <div className="mx-auto max-w-[1000px]">
            <Link href="/guide" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FE6311] transition-colors hover:underline">
              <ArrowLeft size={12} /> Back to sourcing guide
            </Link>
            <div className="mt-8">
              <span className="font-mono text-[9.5px] text-[#FE6311] bg-white px-3 py-1 rounded-xs uppercase tracking-widest font-bold border border-[rgba(23,26,29,0.1)]">Himat Textile / Business Sourcing Guide</span>
              <div className="mt-4 h-0.5 w-16 bg-[#FE6311]" />
              <h1 className="mt-6 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[0.92] tracking-tight text-[#171A1D]">{guide.title}</h1>
              <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-[rgba(23,26,29,0.1)] py-3 font-mono text-[10px] uppercase tracking-wider text-[#171A1D]/70">
                <span>Published in Ahmedabad, India</span>
                <span className="text-[#FE6311]">◆</span>
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



