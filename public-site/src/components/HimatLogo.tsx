import React from "react";

// Monogram overlapping HT logo icon with Golden Yellow (#F5B014)
export function HimatLogoIcon({ 
  className = "h-14 w-14", 
  goldColor = "#F5B014", 
  charcoalColor = "#1A1A1A" 
}: { 
  className?: string; 
  goldColor?: string; 
  charcoalColor?: string; 
}) {
  return (
    <svg
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Himat Textile Logo"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD44D" />
          <stop offset="50%" stopColor="#F5B014" />
          <stop offset="100%" stopColor="#D48B00" />
        </linearGradient>
      </defs>
      {/* T Top Angled Bar */}
      <path
        d="M22 10 L108 10 L108 24 L12 24 L22 10 Z"
        fill="url(#logoGradient)"
      />

      {/* T Vertical Stem & Bottom Serif */}
      <path
        d="M53 24 H67 V98 L78 116 H42 L53 98 V24 Z"
        fill="url(#logoGradient)"
      />

      {/* H Left Column & Serifs */}
      <path d="M12 30 H44 V36 C38 36 37 39 37 45 V96 C37 102 38 105 44 105 V111 H12 V105 C18 105 19 102 19 96 V45 C19 39 18 36 12 36 V30 Z" fill={charcoalColor} />

      {/* H Right Column & Serifs */}
      <path d="M76 30 H108 V36 C102 36 101 39 101 45 V96 C101 102 102 105 108 105 V111 H76 V105 C82 105 83 102 83 96 V45 C83 39 82 36 76 36 V30 Z" fill={charcoalColor} />

      {/* H Crossbar */}
      <path d="M37 66 H83 V74 H37 V66 Z" fill="url(#logoGradient)" />
    </svg>
  );
}

// Logo image component directly rendering the brand logo
export function HimatLogoImage({ 
  className = "h-16 w-auto", 
  rounded = false 
}: { 
  className?: string; 
  rounded?: boolean; 
}) {
  return (
    <img
      src="/images/himat_logo.png"
      alt="Himat Textile Logo"
      className={`${className} ${rounded ? "rounded-xs" : ""} object-contain transition-transform duration-300 hover:scale-105 filter drop-shadow-xs`}
      loading="eager"
    />
  );
}

// Prominent Brand Lockup: Logo Mark + "HIMAT TEXTILE" in ONE line + Centered Tagline "- YOUR GARMENT GUIDE IN AHMEDABAD -"
export default function HimatLogo({
  className = "",
  light = true,
  stacked = false,
  size = "md"
}: {
  className?: string;
  light?: boolean;
  stacked?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const isSm = size === "sm";
  const isLg = size === "lg";
  const isXl = size === "xl";

  return (
    <div className={`inline-flex flex-col items-center text-center select-none group ${className}`}>
      {/* Line 1: Logo Mark and HIMAT TEXTILE together in ONE line */}
      <div className="flex items-center justify-center gap-2 sm:gap-2.5">
        <HimatLogoImage 
          className={
            isSm 
              ? "h-6 sm:h-7 md:h-8 w-auto" 
              : isXl 
              ? "h-12 sm:h-14 w-auto" 
              : isLg 
              ? "h-8 sm:h-10 w-auto" 
              : "h-7 sm:h-8 w-auto"
          } 
        />
        <span
          className={`font-serif-display font-black uppercase tracking-[0.14em] leading-none ${
            isSm 
              ? "text-sm sm:text-base md:text-lg" 
              : isXl 
              ? "text-2xl sm:text-4xl" 
              : isLg 
              ? "text-lg sm:text-2xl" 
              : "text-base sm:text-xl"
          } ${light ? "text-[#171A1D]" : "text-[#FAF8F5]"}`}
        >
          HIMAT <span className="text-[#FE6311]">TEXTILE</span>
        </span>
      </div>

      {/* Line 2: Tagline Centered Underneath */}
      <div
        className={`w-full text-center font-mono font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors ${
          isSm 
            ? "text-[6.5px] sm:text-[7.5px] md:text-[8.5px] mt-1" 
            : isXl 
            ? "text-[11px] sm:text-[13px] mt-2" 
            : isLg 
            ? "text-[8.5px] sm:text-[10px] mt-1.5" 
            : "text-[7.5px] sm:text-[9px] mt-1"
        } ${light ? "text-[#171A1D]/75" : "text-[#FAF8F5]/75"}`}
      >
        <span className="text-[#FE6311] font-bold">-</span> YOUR GARMENT GUIDE IN AHMEDABAD <span className="text-[#FE6311] font-bold">-</span>
      </div>
    </div>
  );
}





