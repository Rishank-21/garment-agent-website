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

// Prominent Brand Lockup: Big Logo Mark + Bold Luxury "HIMAT TEXTILE" Typography
export default function HimatLogo({
  className = "",
  light = true,
  stacked = true,
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
    <div className={`inline-flex ${stacked ? "flex-col items-center text-center" : "flex-row items-center gap-3.5"} select-none group ${className}`}>
      {/* Prominent Logo Mark */}
      <div className="relative shrink-0 flex items-center justify-center">
        <HimatLogoImage 
          className={
            isSm 
              ? "h-13 sm:h-16 w-auto" 
              : isXl 
              ? "h-24 sm:h-32 w-auto" 
              : isLg 
              ? "h-20 sm:h-24 w-auto" 
              : "h-16 sm:h-20 w-auto"
          } 
        />
      </div>

      {/* Brand Typography Underneath / Beside */}
      <div className={`flex flex-col ${stacked ? "items-center mt-2" : "items-start"}`}>
        <div className="flex items-center gap-1.5">
          <span
            className={`font-serif-display font-black uppercase tracking-[0.14em] leading-tight ${
              isSm 
                ? "text-base sm:text-xl md:text-2xl" 
                : isXl 
                ? "text-3xl sm:text-5xl md:text-6xl" 
                : isLg 
                ? "text-2xl sm:text-4xl" 
                : "text-xl sm:text-3xl"
            } ${light ? "text-[#171A1D]" : "text-[#FAF8F5]"}`}
          >
            HIMAT <span className={light ? "text-[#FE6311]" : "text-[#FFFAF4]"}>TEXTILE</span>
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className={`h-[1.5px] w-4 ${light ? "bg-[#FFB51A]" : "bg-[#FFB51A]"}`} />
          <span className={`font-mono font-extrabold uppercase tracking-[0.24em] ${light ? "text-[#C67D00]" : "text-[#FFD44D]"} ${
            isSm 
              ? "text-[9.5px] sm:text-[11px]" 
              : isXl 
              ? "text-[12px] sm:text-[14px]" 
              : isLg 
              ? "text-[11px] sm:text-[12.5px]" 
              : "text-[10px] sm:text-[12px]"
          }`}>
            YOUR GARMENT GUIDE IN AHMEDABAD
          </span>
          <span className={`h-[1.5px] w-4 ${light ? "bg-[#FFB51A]" : "bg-[#FFB51A]"}`} />
        </div>
      </div>
    </div>
  );
}




