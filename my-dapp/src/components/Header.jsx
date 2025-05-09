import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ background: "#18304b", color: "#fff", padding: "0.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 8px #0001" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: 28, color: "#3fd0ff", letterSpacing: 1, marginRight: 12 }}>🛡️ Pixel<span style={{ color: "#fff" }}>Shield</span></span>
        <Link to="/" style={{ color: "#fff", marginRight: 32, fontWeight: 500, textDecoration: "none", fontSize: 18 }}>Home</Link>
        <Link to="/history" style={{ color: "#fff", fontWeight: 500, textDecoration: "none", fontSize: 18 }}>History</Link>
      </div>
      <div>
        <span style={{ width: 40, height: 40, borderRadius: "50%", background: "#3fd0ff", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#18304b", fontWeight: 700, fontSize: 20 }}>U</span>
      </div>
    </header>
  );
} 