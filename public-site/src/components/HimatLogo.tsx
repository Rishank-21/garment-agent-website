import React from "react";

// Monogram overlapping HT logo icon
export function HimatLogoIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* T Top Bar (Yellow) */}
      <path d="M10 10H110V22H10V10Z" fill="#FFB800" />
      
      {/* T Vertical Stem (Yellow) */}
      <path d="M54 22H66V120H54V22Z" fill="#FFB800" />

      {/* H Left Stem (Orange) */}
      <path d="M22 30H38V110H22V30Z" fill="#F05A24" />
      {/* H Right Stem (Orange) */}
      <path d="M82 30H98V110H82V30Z" fill="#F05A24" />
      {/* H Crossbar (Orange) */}
      <path d="M38 64H82V76H38V64Z" fill="#F05A24" />

      {/* Serif Details for H (Orange) */}
      {/* Left top serif */}
      <path d="M16 30H44V34H16V30Z" fill="#F05A24" />
      {/* Left bottom serif */}
      <path d="M16 106H44V110H16V106Z" fill="#F05A24" />
      {/* Right top serif */}
      <path d="M76 30H104V34H76V30Z" fill="#F05A24" />
      {/* Right bottom serif */}
      <path d="M76 106H104V110H76V106Z" fill="#F05A24" />
    </svg>
  );
}

// Full logo with "HIMAT TEXTILE" and taglines
export default function HimatLogo({ className = "h-24 w-auto", light = false }: { className?: string; light?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* HT Monogram Icon shifted to center */}
      <g transform="translate(140, 15)">
        {/* T Top Bar (Yellow) */}
        <path d="M10 10H110V22H10V10Z" fill="#FFB800" />
        
        {/* T Vertical Stem (Yellow) */}
        <path d="M54 22H66V120H54V22Z" fill="#FFB800" />

        {/* H Left Stem (Orange) */}
        <path d="M22 30H38V110H22V30Z" fill="#F05A24" />
        {/* H Right Stem (Orange) */}
        <path d="M82 30H98V110H82V30Z" fill="#F05A24" />
        {/* H Crossbar (Orange) */}
        <path d="M38 64H82V76H38V64Z" fill="#F05A24" />

        {/* Serif Details for H (Orange) */}
        <path d="M16 30H44V34H16V30Z" fill="#F05A24" />
        <path d="M16 106H44V110H16V106Z" fill="#F05A24" />
        <path d="M76 30H104V34H76V30Z" fill="#F05A24" />
        <path d="M76 106H104V110H76V106Z" fill="#F05A24" />
      </g>

      {/* HIMAT TEXTILE */}
      <text
        x="200"
        y="172"
        textAnchor="middle"
        fill={light ? "#0D0D0D" : "#FFFFFF"}
        fontFamily="var(--font-display), 'Archivo Black', sans-serif"
        fontSize="28"
        fontWeight="900"
        letterSpacing="2"
      >
        HIMAT TEXTILE
      </text>

      {/* Your Garment Guide In Ahmedabad */}
      <text
        x="200"
        y="198"
        textAnchor="middle"
        fill="#FFB800"
        fontFamily="var(--font-mono), 'DM Mono', monospace"
        fontSize="12"
        fontWeight="500"
        letterSpacing="3"
      >
        Your Garment Guide In Ahmedabad
      </text>

      {/* Sourcing • Wholesale • Private Label • Export */}
      <text
        x="200"
        y="218"
        textAnchor="middle"
        fill={light ? "#4B5563" : "#A8A29E"}
        fontFamily="var(--font-sans), sans-serif"
        fontSize="10"
        fontWeight="500"
        letterSpacing="1.5"
      >
        Sourcing • Wholesale • Private Label • Export
      </text>
    </svg>
  );
}

