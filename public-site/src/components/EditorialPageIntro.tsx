import Link from "next/link";
import { MoveUpRight } from "lucide-react";

interface EditorialPageIntroProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  image?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function EditorialPageIntro({ eyebrow, title, description, image, imageAlt, ctaLabel, ctaHref }: EditorialPageIntroProps) {
  return (
    <section className="relative overflow-hidden bg-[#161612] px-5 pb-20 pt-32 text-[#F4EFE6] sm:px-8 lg:px-12 lg:pb-28 lg:pt-40">
      {image && (
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <img src={image} alt={imageAlt || "Himat Textile garment sourcing"} className="h-full w-full object-cover opacity-30 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#161612] via-[#161612]/75 to-[#161612]/10" />
        </div>
      )}
      <div className="noise-layer absolute inset-0" />
      <div className="relative mx-auto max-w-[1500px]">
        <div className="max-w-4xl">
          <span className="mono-label block text-[10px] tracking-[0.24em] text-[#C19040]">{eyebrow}</span>
          <div className="mt-5 h-[3px] w-16 bg-gradient-to-r from-[#C95A1A] to-[#C19040]" />
          <h1 className="mt-7 font-display text-[clamp(3.5rem,8vw,7.5rem)] font-black uppercase leading-[0.86] tracking-[-0.07em]">{title}</h1>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-[#F4EFE6]/70 sm:text-base">{description}</p>
          {ctaLabel && ctaHref && (
            <Link href={ctaHref} className="gold-button mt-8 inline-flex items-center gap-2 px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] transition-transform hover:-translate-y-0.5">
              {ctaLabel} <MoveUpRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
