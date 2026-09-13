import { ImageResponse } from "next/og";

export const alt = "SDN Danabhakti";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "76px",
          background: "#f7fbff",
          color: "#16283d",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", width: "100%", alignItems: "center", gap: "64px" }}>
          <div
            style={{
              display: "flex",
              width: "150px",
              height: "150px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "24px",
              background: "#f4be22",
              color: "#16283d",
              fontSize: "52px",
              fontWeight: 800,
            }}
          >
            SD
          </div>
          <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <span style={{ marginBottom: "12px", color: "#0b2f63", fontSize: "26px", fontWeight: 700 }}>
              Sekolah Dasar Negeri
            </span>
            <span style={{ fontSize: "76px", fontWeight: 800, letterSpacing: "-4px", lineHeight: 1 }}>
              SDN Danabhakti
            </span>
            <span style={{ marginTop: "22px", color: "#40566f", fontSize: "27px" }}>
              Tempat tumbuh, belajar, dan berkarya bersama.
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
