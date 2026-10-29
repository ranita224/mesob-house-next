import { ImageResponse } from "next/og";
import { getDish } from "../dishes";

export const alt = "A dish on the Mesob Eats menu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  const title = dish ? dish.name : "Mesob Eats";
  const price = dish ? `ETB ${dish.price}` : "Ethiopian food, delivered";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#7A1401",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          color: "#FFF8F6",
        }}
      >
        <div style={{ fontSize: 32, letterSpacing: 2 }}>MESOB EATS</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
          <div style={{ fontSize: 44, marginTop: 24, color: "#F5B83D" }}>
            {price}
          </div>
        </div>
        <div style={{ fontSize: 26 }}>Delivered hot across Addis Ababa</div>
      </div>
    ),
    { ...size }
  );
}