"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import indiaMap from "@svg-maps/india";

gsap.registerPlugin(ScrollTrigger);

const activeStateIds = new Set(["pb", "dl", "rj", "gj", "mh", "ka", "mp"]);

const networkNodes = [
  { name: "Ludhiana", desc: "Woolen & Knitwear Production Cluster" },
  { name: "Delhi NCR", desc: "Capital Sourcing & Retail Distribution" },
  { name: "Jaipur", desc: "Artisanal Hand-block Prints & Cottons" },
  { name: "Ahmedabad HQ", desc: "Cotton Twill & Spinning Mills HQ" },
  { name: "Indore", desc: "Central Transit & Regional Logistical Hub" },
  { name: "Mumbai", desc: "Corporate Distribution & Fashion Head Offices" },
  { name: "Nagpur", desc: "Central India Freight & Rail Corridor" },
  { name: "Bangalore", desc: "Export-grade Denim & Modern Apparel Tech" },
];

const networkPins = [
  { name: "Ludhiana", x: 151, y: 152, dx: 0, dy: -25, w: 55, h: 16 },
  { name: "Delhi", x: 186, y: 210, dx: 35, dy: -20, w: 45, h: 16 },
  { name: "Jaipur", x: 112, y: 249, dx: -35, dy: -20, w: 45, h: 16 },
  { name: "Ahmedabad", x: 66, y: 355, dx: -45, dy: -20, w: 70, h: 16 },
  { name: "Indore", x: 135, y: 370, dx: 35, dy: -15, w: 45, h: 16 },
  { name: "Mumbai", x: 130, y: 440, dx: -35, dy: 15, w: 50, h: 16 },
  { name: "Nagpur", x: 200, y: 410, dx: 45, dy: -15, w: 55, h: 16 },
  { name: "Bangalore", x: 171, y: 519, dx: -45, dy: -15, w: 60, h: 16 },
];

export default function IndiaNetwork() {
  const mapRef = useRef<SVGSVGElement>(null);
  const pathsGroupRef = useRef<SVGGElement>(null);
  const pinsGroupRef = useRef<SVGGElement>(null);
  const labelsGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const paths = pathsGroupRef.current?.querySelectorAll("path");
    const pins = pinsGroupRef.current?.querySelectorAll(".map-pin-g");
    const labels = labelsGroupRef.current?.querySelectorAll(".map-label-g");

    if (paths && pins && labels) {
      gsap.set(paths, { opacity: 0 });
      gsap.set(pins, { scale: 0, opacity: 0, transformOrigin: "center bottom" });
      gsap.set(labels, { opacity: 0, scale: 0.8, transformOrigin: "center center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 75%",
          end: "bottom 30%",
          toggleActions: "play none none none",
        },
      });

      tl.to(paths, {
        opacity: 1,
        stagger: 0.01,
        duration: 0.5,
        ease: "power1.out",
      })
      .to(pins, {
        scale: 1,
        opacity: 1,
        stagger: 0.03,
        duration: 0.4,
        ease: "back.out(1.2)",
      }, "-=0.25")
      .to(labels, {
        opacity: 1,
        scale: 1,
        stagger: 0.02,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.15");
    }
  }, []);

  return (
    <section id="network" className="scroll-mt-28 relative bg-[#FAF8F5] py-24 border-t border-[#E2DDD5] text-[#1A1A1A]">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Info Text */}
          <div className="space-y-6">
            <span className="mono-label text-[9px] font-bold tracking-widest text-[#E94B0C] uppercase bg-[#FFF9E6] border border-[#FFB51A]/40 px-3.5 py-1.5 rounded-xs inline-block shadow-xs">
              [ 04 / AHMEDABAD ADVANTAGE ]
            </span>
            <h2 className="font-serif-display text-4xl font-black uppercase tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl leading-[0.98]">
              AHMEDABAD, INDIA â€”<br /><span className="italic font-normal text-[#FE6311]">YOUR SOURCING PARTNER.</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[#66625D]">
              Positioning Ahmedabad as a strategic advantage for garment sourcing, fabric selection, and textile manufacturing. We operate across major garment and fabric hubs, connecting raw materials, spinning mills, design centers, and wholesale networks to serve global fashion brands.
            </p>
            <div className="space-y-4 border-t border-[#E2DDD5] pt-6">
              {networkNodes.map((node) => (
                <div key={node.name} className="flex items-center gap-4">
                  <span className={`h-2.5 w-2.5 rounded-full ${node.name.includes("Ahmedabad") ? "bg-[#FE6311] ring-4 ring-[#FE6311]/30" : "bg-[#FFB51A]"}`} />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">{node.name}</h4>
                    <p className="text-[11px] text-[#66625D]">{node.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SVG Map Graphics */}
          <div className="relative flex justify-center rounded-xs border border-[#E2DDD5] bg-[#FFFFFF] p-6 sm:p-12 overflow-hidden shadow-sm">
            <svg
              ref={mapRef}
              viewBox="0 0 612 696"
              className="h-auto aspect-[612/696] w-full max-w-[500px] text-[#1A1A1A]"
            >
              {/* Grid Background Pattern */}
              <defs>
                <pattern id="network-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(254, 99, 17, 0.12)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#network-grid)" />

              {/* India Detailed SVG Map Paths */}
              <g ref={pathsGroupRef}>
                {indiaMap.locations.map((loc: { id: string; name: string; path: string }) => {
                  const isActive = activeStateIds.has(loc.id);
                  return (
                    <path
                      key={loc.id}
                      d={loc.path}
                      className={`transition-all duration-300 ${
                        isActive
                          ? "fill-[#FFB51A] stroke-[#FE6311]/40 hover:fill-[#FFC933]"
                          : "fill-[#F3EFEA] stroke-[#DEDAD2] hover:fill-[#EAE4DC]"
                      }`}
                      strokeWidth="0.75"
                      aria-label={loc.name}
                    />
                  );
                })}
              </g>

              {/* Map Pins */}
              <g ref={pinsGroupRef}>
                {networkPins.map((pin) => (
                  <g
                    key={`pin-${pin.name}`}
                    className="map-pin-g cursor-pointer transition-transform duration-300"
                  >
                    {/* Ring outer glow */}
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="12"
                      className="animate-ping fill-none stroke-[#FE6311]/70"
                      style={{ transformOrigin: `${pin.x}px ${pin.y}px`, animationDuration: "3s" }}
                    />
                    {/* Pointer Pin Shape */}
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="#252525"
                      stroke="#FFB51A"
                      strokeWidth="1.5"
                      transform={`translate(${pin.x - 12}, ${pin.y - 22})`}
                    />
                  </g>
                ))}
              </g>

              {/* Leader-line White Tooltip Boxes */}
              <g ref={labelsGroupRef}>
                {networkPins.map((pin) => {
                  const rectX = -pin.w / 2;
                  const rectY = -pin.h / 2;
                  return (
                    <g
                      key={`label-${pin.name}`}
                      className="map-label-g pointer-events-none"
                      transform={`translate(${pin.x + pin.dx}, ${pin.y + pin.dy})`}
                    >
                      {/* Leader pointer line */}
                      <line
                        x1={-pin.dx}
                        y1={-pin.dy - 10}
                        x2={0}
                        y2={0}
                        stroke="rgba(254, 99, 17, 0.6)"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      {/* White border-rounded text box */}
                      <rect
                        x={rectX}
                        y={rectY}
                        width={pin.w}
                        height={pin.h}
                        fill="#FFFFFF"
                        stroke="#FE6311"
                        strokeWidth="1"
                        rx="2"
                      />
                      {/* Labeled text */}
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        fill="#252525"
                        className="font-sans text-[7.5px] font-black uppercase tracking-tight"
                      >
                        {pin.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

