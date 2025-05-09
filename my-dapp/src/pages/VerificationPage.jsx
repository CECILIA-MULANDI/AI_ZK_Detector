import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerificationPage() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const steps = [
      'Initializing verification...',
      'Computing image hash...',
      'Analyzing image content...',
      'Generating zero-knowledge proof...',
      'Verifying results...',
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setCurrentStep(steps[currentStepIndex]);
        setProgress(((currentStepIndex + 1) / steps.length) * 100);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        // Simulate completion and navigate to results
        setTimeout(() => {
          navigate('/results');
        }, 1000);
      }
    }, 2000);

    return () => clearInterval(interval);
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