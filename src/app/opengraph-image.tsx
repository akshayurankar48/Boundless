import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VANGUARD INK — Black & Gray Realism Tattoo Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* Border frame */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            right: 32,
            bottom: 32,
            border: "1px solid #262626",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {/* Label */}
          <div
            style={{
              fontSize: 14,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#b8b5ad",
              fontFamily: "sans-serif",
            }}
          >
            Black & Gray Realism Studio
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#f5f5f0",
              letterSpacing: "0.08em",
              fontFamily: "serif",
            }}
          >
            VANGUARD INK
          </div>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 1,
              backgroundColor: "#b8b5ad",
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: 18,
              color: "#a3a3a0",
              fontFamily: "sans-serif",
            }}
          >
            Where precision meets permanence
          </div>

          {/* Location */}
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6b6b68",
              fontFamily: "sans-serif",
              marginTop: 8,
            }}
          >
            New York City
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
