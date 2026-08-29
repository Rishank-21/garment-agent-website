import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#161612",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px",
        }}
      >
        <svg
          viewBox="0 0 120 130"
          style={{ width: "100%", height: "100%" }}
          fill="none"
        >
          {/* T Top Bar (Yellow) */}
          <path d="M10 10H110V22H10V10Z" fill="#C19040" />
          
          {/* T Vertical Stem (Yellow) */}
          <path d="M54 22H66V120H54V22Z" fill="#C19040" />

          {/* H Left Stem (Orange) */}
          <path d="M22 30H38V110H22V30Z" fill="#C95A1A" />
          {/* H Right Stem (Orange) */}
          <path d="M82 30H98V110H82V30Z" fill="#C95A1A" />
          {/* H Crossbar (Orange) */}
          <path d="M38 64H82V76H38V64Z" fill="#C95A1A" />

          {/* Serif Details for H (Orange) */}
          <path d="M16 30H44V34H16V30Z" fill="#C95A1A" />
          <path d="M16 106H44V110H16V106Z" fill="#C95A1A" />
          <path d="M76 30H104V34H76V30Z" fill="#C95A1A" />
          <path d="M76 106H104V110H76V106Z" fill="#C95A1A" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
