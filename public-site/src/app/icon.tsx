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
          background: "#5C0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3px",
          borderRadius: "6px",
        }}
      >
        <svg
          viewBox="0 0 120 130"
          style={{ width: "100%", height: "100%" }}
          fill="none"
        >
          {/* T Top Angled Bar (Gold #B8924A) */}
          <path d="M22 10 L108 10 L108 24 L12 24 L22 10 Z" fill="#B8924A" />

          {/* T Vertical Stem (Gold #B8924A) */}
          <path d="M53 24 H67 V98 L78 116 H42 L53 98 V24 Z" fill="#B8924A" />

          {/* H Left Column (Ivory #F8F4EF) */}
          <path d="M12 30 H44 V36 C38 36 37 39 37 45 V96 C37 102 38 105 44 105 V111 H12 V105 C18 105 19 102 19 96 V45 C19 39 18 36 12 36 V30 Z" fill="#F8F4EF" />

          {/* H Right Column (Ivory #F8F4EF) */}
          <path d="M76 30 H108 V36 C102 36 101 39 101 45 V96 C101 102 102 105 108 105 V111 H76 V105 C82 105 83 102 83 96 V45 C83 39 82 36 76 36 V30 Z" fill="#F8F4EF" />

          {/* H Crossbar (Gold #B8924A) */}
          <path d="M37 66 H83 V74 H37 V66 Z" fill="#B8924A" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}



