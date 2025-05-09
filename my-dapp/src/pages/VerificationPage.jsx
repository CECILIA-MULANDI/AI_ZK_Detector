import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UltraHonkBackend } from '@aztec/bb.js';
import { Noir } from '@noir-lang/noir_js';
import circuit from '../../circuit/target/circuit.json';

export default function VerificationPage() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Helper: Compute image hash
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

  useEffect(() => {
    const runVerification = async () => {
      try {
        setCurrentStep('Loading image...');
        setProgress(10);
        // Load image from sessionStorage
        const imageDataUrl = sessionStorage.getItem('uploadedImage');
        const imageName = sessionStorage.getItem('uploadedImageName');
        if (!imageDataUrl) throw new Error('No image found.');
        // Convert dataURL to File/Blob
        const res = await fetch(imageDataUrl);
        const blob = await res.blob();
        const file = new File([blob], imageName || 'uploaded.png', { type: blob.type });

        setCurrentStep('Computing image hash...');
        setProgress(25);
        const imageHash = await computeImageHash(file);

        setCurrentStep('Classifying image...');
        setProgress(40);
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('http://127.0.0.1:8000/api/classify', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();

        setCurrentStep('Preparing zero-knowledge proof...');
        setProgress(60);
        const predictedClass = data.predicted_class;
        const publicExpectedClass = predictedClass;
        const inputs = {
          image_hash: imageHash,
          predicted_class: predictedClass,
          public_expected_class: publicExpectedClass,
        };

        const noir = new Noir(circuit);
        const backend = new UltraHonkBackend(circuit.bytecode);

        setCurrentStep('Generating witness...');
        setProgress(70);
        const { witness } = await noir.execute(inputs);

        setCurrentStep('Generating proof...');
        setProgress(80);
        const proof = await backend.generateProof(witness);

        setCurrentStep('Verifying proof...');
        setProgress(90);
        const isValid = await backend.verifyProof(proof);

        setCurrentStep('Done!');
        setProgress(100);

        // Prepare result object
        const result = {
          predicted_class: predictedClass,
          proofValid: isValid,
          artificial_prob: data.artificial_prob,
          human_prob: data.human_prob,
          image_hash: inputs.image_hash,
          timestamp: new Date().toISOString(),
        };
        // Save to sessionStorage for history
        sessionStorage.setItem('lastResult', JSON.stringify(result));
        // Navigate to results page with result
        setTimeout(() => {
          navigate('/results', { state: { result } });
        }, 1000);
      } catch (err) {
        setError(err.message || 'Unknown error occurred');
      }
    };
    runVerification();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Verifying Image</h1>
          <div className="bg-gray-800 rounded-xl p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            {/* Current Step */}
            <div className="text-center">
              <div className="text-6xl mb-6 animate-bounce">🔍</div>
              <p className="text-xl font-medium mb-2">{currentStep}</p>
              <p className="text-gray-400">Please wait while we verify your image...</p>
              {error && <p className="text-red-400 mt-4">Error: {error}</p>}
            </div>
            {/* Loading Animation */}
            <div className="mt-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 