import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#18304b", color: "#fff", fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2rem 3rem 1rem 3rem" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 28, color: "#3fd0ff", letterSpacing: 1 }}>🛡️ Pixel<span style={{ color: "#fff" }}>Shield</span></span>
        </div>
        <div>
          <Link to="/" style={{ color: "#fff", marginRight: 32, fontWeight: 500, textDecoration: "none", fontSize: 18 }}>Home</Link>
          <Link to="/app" style={{ color: "#fff", background: "#18304b", border: "1px solid #3fd0ff", borderRadius: 8, padding: "8px 24px", fontWeight: 600, textDecoration: "none", fontSize: 18 }}>Login</Link>
        </div>
      </nav>
      <main style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", padding: "2rem 3rem 0 3rem" }}>
        <div style={{ flex: 1, minWidth: 320, maxWidth: 500, marginRight: 40 }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 24, color: "#fff" }}>
            Verify <span style={{ color: "#3fd0ff" }}>Image Authenticity</span><br />with ZK Proofs
          </h1>
          <p style={{ fontSize: 18, color: "#b0c4d4", marginBottom: 32 }}>
            Ensure trust in digital media by proving the authenticity and edit history of images. Our ZK-powered verification stack helps developers and users detect AI-generated or manipulated content with ease.
          </p>
          <Link to="/app" style={{ background: "#3fd0ff", color: "#18304b", fontWeight: 700, fontSize: 20, borderRadius: 8, padding: "14px 32px", textDecoration: "none" }}>
            Get Started for free
          </Link>
        </div>
        <div style={{ flex: 1, minWidth: 320, maxWidth: 420, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ position: "relative", width: 340, height: 260, background: "#223a5a", borderRadius: 24, boxShadow: "0 8px 32px #0002", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=340&h=260" alt="AI or Human" style={{ width: 340, height: 260, objectFit: "cover", borderRadius: 24 }} />
            <span style={{ position: "absolute", top: 16, right: 16, background: "#ff4d6d", color: "#fff", fontWeight: 700, borderRadius: 8, padding: "4px 16px", fontSize: 16 }}>AI Generated</span>
            <span style={{ position: "absolute", bottom: 16, left: 16, background: "#2ecc71", color: "#fff", fontWeight: 700, borderRadius: 8, padding: "4px 16px", fontSize: 16 }}>Authentic Image</span>
          </div>
        </div>
      </main>
      <div style={{ marginTop: 48, background: "#223a5a", padding: "16px 0", display: "flex", justifyContent: "center", gap: 32 }}>
        <span style={{ color: "#fff", fontWeight: 500 }}>
          ZK-Powered Image Verification
        </span>
        <span style={{ color: "#fff", fontWeight: 500 }}>
          Tamper-Proof Edit History
        </span>
        <span style={{ color: "#fff", fontWeight: 500 }}>
          Blockchain-Backed Security
        </span>
        <span style={{ color: "#fff", fontWeight: 500 }}>
          AI-Deepfake Detection
        </span>
        <span style={{ color: "#fff", fontWeight: 500 }}>
          Instant Authentication
        </span>
      </div>
      <footer style={{ textAlign: "center", color: "#b0c4d4", padding: "2rem 0 1rem 0", fontSize: 16 }}>
        Copyright © 2025 PixelShield. All Rights Reserved
      </footer>
    </div>
  );
} 