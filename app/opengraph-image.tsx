import { ImageResponse } from "next/og";

// Required so the route is pre-rendered at build time under `output: "export"`.
export const dynamic = "force-static";

export const alt = "Will D. Wang — DevOps / Platform Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700 }}>Will D. Wang</div>
        <div style={{ fontSize: 40, marginTop: 20, color: "#a5d8d2" }}>
          DevOps / Platform Engineer
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 24,
            color: "#cbd5e1",
            maxWidth: 960,
            lineHeight: 1.4,
          }}
        >
          Member of Technical Staff at OpusClip — CI/CD, cloud infrastructure,
          and AI-assisted developer workflows on GCP &amp; Kubernetes.
        </div>
      </div>
    ),
    { ...size },
  );
}
