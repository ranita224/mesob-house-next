import { ImageResponse } from "next/og";

export const alt = "Mesob Eats - Ethiopian food delivery in Addis Ababa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#7A1401",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "#FFF8F6",
        }}
      >
        <div style={{ fontSize: 100, fontWeight: 700 }}>Mesob Eats</div>
        <div style={{ fontSize: 44, marginTop: 24 }}>
          Ethiopian food, delivered across Addis Ababa
        </div>
        <div style={{ fontSize: 34, marginTop: 48, color: "#F5B83D" }}>
          Doro Wat · Tibs · Kitfo · Shiro
        </div>
      </div>
    ),
    { ...size }
  );
}
