import { compile, createFileManager } from "@noir-lang/noir_wasm";
import { UltraHonkBackend } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";
import main from "./circuit/src/main.nr?url";
import nargoToml from "./circuit/Nargo.toml?url";
import initNoirC from "@noir-lang/noirc_abi";
import initACVM from "@noir-lang/acvm_js";
import acvm from "@noir-lang/acvm_js/web/acvm_js_bg.wasm?url";
import noirc from "@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url";
await Promise.all([initACVM(fetch(acvm)), initNoirC(fetch(noirc))]);
export async function getCircuit() {
  // Create file manager with the appropriate root
  const fm = createFileManager("/");

  // Fetch file content
  const { body } = await fetch(main);
  const { body: nargoTomlBody } = await fetch(nargoToml);

  // Write files with absolute paths
  fm.writeFile("./circuit/src/main.nr", body);
  fm.writeFile("./circuit/Nargo.toml", nargoTomlBody);

  // Compile with correct working directory
  return await compile(fm, "/circuit");
}

const show = (id, content) => {
  const container = document.getElementById(id);
  container.appendChild(document.createTextNode(content));
  container.appendChild(document.createElement("br"));
};
document.getElementById("submit").addEventListener("click", async () => {
  try {
    // Parse age as a number explicitly
    const ageValue = parseInt(document.getElementById("age").value, 10);
    // Validate the input
    if (isNaN(ageValue)) {
      show("logs", "Error: Please enter a valid number for age");
      return;
    }

    show("logs", "Compiling circuit... ⏳");
    const { program } = await getCircuit();
    const noir = new Noir(program);
    const backend = new UltraHonkBackend(program.bytecode);

    show("logs", "Generating witness... ⏳");
    const { witness } = await noir.execute({ age: ageValue });
    show("logs", "Generated witness... ✅");

    show("logs", "Generating proof... ⏳");
    const proof = await backend.generateProof(witness);
    show("logs", "Generated proof... ✅");
    show("results", proof.proof);
    show("logs", "Verifying proof... ⌛");
    const isValid = await backend.verifyProof(proof);
    show("logs", `Proof is ${isValid ? "valid" : "invalid"}... ✅`);
  } catch (error) {
    // Log the actual error
    show("logs", `Error: ${error.message || "Unknown error occurred"}`);
    console.error("Full error:", error);
  }
});
