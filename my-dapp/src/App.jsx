import { useState } from "react";
import { UltraHonkBackend } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";
import circuit from "../circuit/target/circuit.json";

function App() {
  const [image, setImage] = useState(null);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);

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

          // XOR each byte into the hash
          for (let i = 0; i < uint8Array.length; i++) {
            hash[i % 32] ^= uint8Array[i];
          }

          resolve(hash);
        } catch (error) {
          console.error("Hash computation error:", error);
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFile = async (file) => {
    setImage(file);
    setResult(null);
    addLog("Processing image... ⏳");

    try {
      // Compute image hash
      const imageHash = await computeImageHash(file);
      addLog("Computed image hash... ✅");

      // Call classification API
      addLog("Classifying image... ⏳");
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("http://127.0.0.1:8000/api/classify", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      addLog("Received classification... ✅");

      // Map API result
      const predictedClass = data.predicted_class;
      const publicExpectedClass = predictedClass; // Match API result for proof

      // Prepare Noir inputs
      const inputs = {
        image_hash: imageHash, // imageHash is already an array
        predicted_class: predictedClass,
        public_expected_class: publicExpectedClass,
      };

      console.log("Debug - Noir inputs:", {
        image_hash_type: typeof imageHash,
        image_hash_length: imageHash.length,
        image_hash: imageHash,
        predicted_class: predictedClass,
      });

      // Initialize Noir
      addLog("Initializing circuit... ⏳");
      const noir = new Noir(circuit);
      const backend = new UltraHonkBackend(circuit.bytecode);
      addLog("Circuit initialized... ✅");

      // Generate witness
      addLog("Generating witness... ⏳");
      const { witness } = await noir.execute(inputs);
      addLog("Generated witness... ✅");

      // Generate proof
      addLog("Generating proof... ⏳");
      const proof = await backend.generateProof(witness);
      addLog("Generated proof... ✅");

      // Verify proof
      addLog("Verifying proof... ⏳");
      const isValid = await backend.verifyProof(proof);
      addLog(`Proof is ${isValid ? "valid" : "invalid"}... ✅`);

      // Set result
      setResult({
        predicted_class: predictedClass,
        proofValid: isValid,
        artificial_prob: data.artificial_prob,
        human_prob: data.human_prob,
        image_hash: inputs.image_hash,
      });
    } catch (error) {
      addLog(`Error: ${error.message || "Unknown error occurred"}`);
      console.error("Error:", error);
    }
  };

  // Handle file input change
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  // Handle drag-and-drop (removed unused function)

  // Prevent default drag behavior

  return (
    <div>
      <h1>My DApp</h1>
      <input type="file" accept="image/*" onChange={handleInputChange} />
      {image && <p>Selected file: {image.name}</p>}
      <div>
        <h2>Logs</h2>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
      {result && (
        <div>
          <h2>Results</h2>
          <p>AI Generated: {result.predicted_class === 1 ? "Yes" : "No"}</p>
          <p>Proof Valid: {result.proofValid ? "Yes" : "No"}</p>
          <p>Confidence:</p>
          <ul>
            <li>AI Generated: {(result.artificial_prob * 100).toFixed(2)}%</li>
            <li>Human Generated: {(result.human_prob * 100).toFixed(2)}%</li>
          </ul>
          <p>Image Hash: {result.image_hash.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
