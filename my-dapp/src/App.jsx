import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import { UltraHonkBackend } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";
import circuit from "../circuit/target/circuit.json";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<HomePage />} />
    </Routes>
  );
}

export default App;
