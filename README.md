# AI_ZK_Detector

# my-dapp is a zk_app that is used to detect if an image is AI generated or not!

- It runs a hugging face AI model in the AI-image-detector which helps classify the image and give scores to determine if the image is AI generated or not.
- The result of this is fed into a noir circuit that is run by a proving backend to generate proofs and verify them

 <!-- To run this locally -->

🚀 Installation & Setup
Prerequisites

Node.js (v16+)
Python 3.8+
Nargo (Noir compiler)
Yarn

### Run the AI-image-detector server

### Navigate to the AI detector directory

cd AI-image-detector

### Install Python dependencies

### Start the FastAPI server

python script.py

### Run the circuit

### Navigate to the circuit directory

cd my-dapp/circuit

### Install dependencies

yarn add @noir-lang/noir_js@1.0.0-beta.2 @aztec/bb.js@0.72.1

### Compile the Noir circuit

nargo compile

### Run the frontend

cd my-dapp/

### Install dependencies

npm install

### Start the development server

npm run dev
