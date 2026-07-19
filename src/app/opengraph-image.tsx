import { ImageResponse } from "next/og";

export const alt = "Akomapa Health - Building Ethical Global Health Leaders";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0F4C5C",
          color: "#FCFAEF",
          padding: 72,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 0,
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 999,
              background: "#F5C94D",
            }}
          />
          Akomapa Health
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "#F5C94D",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            Community-Driven Care. Ethical Leadership. Equitable Partnerships.
          </div>
          <div
            style={{
              maxWidth: 940,
              fontSize: 78,
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: 0,
            }}
          >
            Building Ethical Global Health Leaders
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#E6E7E7",
          }}
        >
          <span>akomapahealth.org</span>
          <span>Healthcare service, training, research, and partnership</span>
        </div>
      </div>
    ),
    size,
  );
}
