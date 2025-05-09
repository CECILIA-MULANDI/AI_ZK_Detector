import { useState, useRef } from "react";
import { UltraHonkBackend } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";
import circuit from "../circuit/target/circuit.json";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function HomePage() {
  const [step, setStep] = useState(1); // 1: Upload, 2: Verify, 3: Results
  const [image, setImage] = useState(null);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef();

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const computeImageHash = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const arrayBuffer = reader.result;
          const uint8Array = new Uint8Array(arrayBuffer);
          const hash = new Array(32).fill(0);
          for (let i = 0; i < uint8Array.length; i++) {
            hash[i % 32] ^= uint8Array[i];
          }
          resolve(hash);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFile = (file) => {
    setImage(file);
    setLogs([]);
    setResult(null);
    setStep(2);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleVerify = async () => {
    setLoading(true);
    setLogs([]);
    setResult(null);
    addLog("Processing image... ⏳");
    try {
      const imageHash = await computeImageHash(image);
      addLog("Computed image hash... ✅");
      addLog("Classifying image... ⏳");
      const formData = new FormData();
      formData.append("file", image);
      const response = await fetch("http://127.0.0.1:8000/api/classify", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      addLog("Received classification... ✅");
      const predictedClass = data.predicted_class;
      const publicExpectedClass = predictedClass;
      const inputs = {
        image_hash: imageHash,
        predicted_class: predictedClass,
        public_expected_class: publicExpectedClass,
      };
      addLog("Initializing circuit... ⏳");
      const noir = new Noir(circuit);
      const backend = new UltraHonkBackend(circuit.bytecode);
      addLog("Circuit initialized... ✅");
      addLog("Generating witness... ⏳");
      const { witness } = await noir.execute(inputs);
      addLog("Generated witness... ✅");
      addLog("Generating proof... ⏳");
      const proof = await backend.generateProof(witness);
      addLog("Generated proof... ✅");
      addLog("Verifying proof... ⏳");
      const isValid = await backend.verifyProof(proof);
      addLog(`Proof is ${isValid ? "valid" : "invalid"}... ✅`);
      setResult({
        predicted_class: predictedClass,
        proofValid: isValid,
        artificial_prob: data.artificial_prob,
        human_prob: data.human_prob,
        image_hash: inputs.image_hash,
      });
      setStep(3);
    } catch (error) {
      addLog(`Error: ${error.message || "Unknown error occurred"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.text("PixelShield Image Verification Report", 10, 10);
    pdf.addImage(imgData, "PNG", 10, 20, 180, 80);
    pdf.text("Logs:", 10, 110);
    logs.forEach((log, i) => {
      pdf.text(`- ${log}`, 10, 120 + i * 8);
    });
    pdf.save("verification_report.pdf");
  };

  // Step 1: Upload
  if (step === 1) {
    return (
      <div style={{ minHeight: "100vh", background: "#1a2236", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Upload Image for Verification</h2>
        <p style={{ color: "#b0c4d4", marginBottom: 32 }}>Drag & drop or browse your PC. Supported: PNG, JPG, JPEG, WEBP</p>
        <label style={{ background: "#223a5a", borderRadius: 16, padding: 40, cursor: "pointer", border: "2px dashed #3fd0ff", marginBottom: 24 }}>
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleInputChange} />
          <span style={{ fontSize: 20, color: "#3fd0ff" }}>Browse your PC</span>
        </label>
        {image && <p>Selected file: {image.name}</p>}
      </div>
    );
  }

  // Step 2: Verify
  if (step === 2) {
    return (
      <div style={{ minHeight: "100vh", background: "#1a2236", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Ready to Verify</h2>
        <img src={URL.createObjectURL(image)} alt="preview" style={{ width: 240, height: 180, objectFit: "cover", borderRadius: 16, marginBottom: 24 }} />
        <button onClick={handleVerify} disabled={loading} style={{ background: "#3fd0ff", color: "#18304b", fontWeight: 700, fontSize: 20, borderRadius: 8, padding: "14px 32px", border: "none", cursor: "pointer", marginBottom: 24 }}>
          {loading ? "Verifying..." : "Proceed to Verify"}
        </button>
        <button onClick={() => setStep(1)} style={{ background: "none", color: "#3fd0ff", border: "none", cursor: "pointer", textDecoration: "underline" }}>Back to Upload</button>
      </div>
    );
  }

  // Step 3: Results
  if (step === 3) {
    return (
      <div style={{ minHeight: "100vh", background: "#1a2236", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div ref={resultRef} style={{ background: "#223a5a", borderRadius: 16, padding: 32, minWidth: 340, maxWidth: 480, marginBottom: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Verification Results</h2>
          <img src={URL.createObjectURL(image)} alt="preview" style={{ width: 220, height: 160, objectFit: "cover", borderRadius: 12, marginBottom: 16 }} />
          {result && (
            <>
              <p style={{ fontSize: 20, fontWeight: 600, color: result.predicted_class === 1 ? "#ff4d6d" : "#2ecc71" }}>
                {result.predicted_class === 1 ? "AI Generated" : "Authentic Image"}
              </p>
              <p>Proof Valid: <span style={{ color: result.proofValid ? "#2ecc71" : "#ff4d6d" }}>{result.proofValid ? "Yes" : "No"}</span></p>
              <p>Confidence:</p>
              <ul>
                <li>AI Generated: {(result.artificial_prob * 100).toFixed(2)}%</li>
                <li>Human Generated: {(result.human_prob * 100).toFixed(2)}%</li>
              </ul>
              <p style={{ wordBreak: "break-all" }}>Image Hash: {result.image_hash.join(", ")}</p>
            </>
          )}
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>Logs</h3>
            <ul style={{ maxHeight: 120, overflowY: "auto", fontSize: 14, background: "#1a2236", borderRadius: 8, padding: 12 }}>
              {logs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={handleDownloadPDF} style={{ background: "#3fd0ff", color: "#18304b", fontWeight: 700, fontSize: 18, borderRadius: 8, padding: "12px 28px", border: "none", cursor: "pointer", marginBottom: 16 }}>
          Download Report (PDF)
        </button>
        <button onClick={() => setStep(1)} style={{ background: "none", color: "#3fd0ff", border: "none", cursor: "pointer", textDecoration: "underline" }}>Verify Another Image</button>
      </div>
    );
  }

  return null;
}

export default HomePage; 