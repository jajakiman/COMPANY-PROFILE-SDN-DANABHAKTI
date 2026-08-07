import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "14px",
          background: "#facc15",
          color: "#1a2e1e",
          fontSize: "24px",
          fontWeight: 800,
        }}
      >
        SD
      </div>
    ),
    size,
  );
}
