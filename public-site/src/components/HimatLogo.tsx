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
      {/* T Top Bar (Gold) */}
      <path d="M10 10H110V22H10V10Z" fill="#C89A3D" />
      
      {/* T Vertical Stem (Gold) */}
      <path d="M54 22H66V120H54V22Z" fill="#C89A3D" />

      {/* H Left Stem (Gold) */}
      <path d="M22 30H38V110H22V30Z" fill="#C89A3D" />
      {/* H Right Stem (Gold) */}
      <path d="M82 30H98V110H82V30Z" fill="#C89A3D" />
      {/* H Crossbar (Gold) */}
      <path d="M38 64H82V76H38V64Z" fill="#C89A3D" />

      {/* Serif Details for H (Gold) */}
      {/* Left top serif */}
      <path d="M16 30H44V34H16V30Z" fill="#C89A3D" />
      {/* Left bottom serif */}
      <path d="M16 106H44V110H16V106Z" fill="#C89A3D" />
      {/* Right top serif */}
      <path d="M76 30H104V34H76V30Z" fill="#C89A3D" />
      {/* Right bottom serif */}
      <path d="M76 106H104V110H76V106Z" fill="#C89A3D" />
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
        {/* T Top Bar (Gold) */}
        <path d="M10 10H110V22H10V10Z" fill="#C89A3D" />
        
        {/* T Vertical Stem (Gold) */}
        <path d="M54 22H66V120H54V22Z" fill="#C89A3D" />

        {/* H Left Stem (Gold) */}
        <path d="M22 30H38V110H22V30Z" fill="#C89A3D" />
        {/* H Right Stem (Gold) */}
        <path d="M82 30H98V110H82V30Z" fill="#C89A3D" />
        {/* H Crossbar (Gold) */}
        <path d="M38 64H82V76H38V64Z" fill="#C89A3D" />

        {/* Serif Details for H (Gold) */}
        <path d="M16 30H44V34H16V30Z" fill="#C89A3D" />
        <path d="M16 106H44V110H16V106Z" fill="#C89A3D" />
        <path d="M76 30H104V34H76V30Z" fill="#C89A3D" />
        <path d="M76 106H104V110H76V106Z" fill="#C89A3D" />
      </g>

      {/* HIMAT TEXTILE */}
      <text
        x="200"
        y="172"
        textAnchor="middle"
        fill={light ? "#0A1F2B" : "#FFFFFF"}
        fontFamily="var(--font-display), sans-serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="2"
      >
        HIMAT TEXTILE
      </text>

      {/* Your Garment Guide In Ahmedabad */}
      <text
        x="200"
        y="198"
        textAnchor="middle"
        fill="#C89A3D"
        fontFamily="var(--font-mono), monospace"
        fontSize="12"
        fontWeight="500"
        letterSpacing="3"
      >
        Your Garment Guide In Ahmedabad
      </text>

      {/* Sourcing • Wholesale • White Labeling • Export */}
      <text
        x="200"
        y="218"
        textAnchor="middle"
        fill={light ? "#667085" : "#FFFFFF"}
        fillOpacity={light ? "1.0" : "0.6"}
        fontFamily="var(--font-sans), sans-serif"
        fontSize="10"
        fontWeight="500"
        letterSpacing="1.5"
      >
        Sourcing • Wholesale • White Labeling • Export
      </text>
    </svg>
  );
}

