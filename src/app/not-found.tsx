const wrapperStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "32px",
  background: "#0f172a",
};

export default function NotFoundPage() {
  return (
    <div style={wrapperStyle}>
      <div
        style={{
          fontSize: "6rem",
          fontWeight: 800,
          background: "linear-gradient(135deg, #818cf8, #22d3ee)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "12px",
        }}
      >
        404
      </div>
      <p style={{ fontSize: "1.125rem", color: "#94a3b8", marginBottom: "32px" }}>
        Page not found
      </p>
      <a
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "12px 24px",
          background: "#818cf8",
          color: "white",
          borderRadius: "8px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Back to Home
      </a>
    </div>
  );
}
