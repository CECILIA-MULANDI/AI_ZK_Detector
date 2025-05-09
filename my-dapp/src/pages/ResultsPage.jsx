import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Try to get result from navigation state
    if (location.state && location.state.result) {
      setResult(location.state.result);
      sessionStorage.setItem('lastResult', JSON.stringify(location.state.result));
    } else {
      // Fallback: try to get from sessionStorage (for history)
      const stored = sessionStorage.getItem('lastResult') || sessionStorage.getItem('currentVerification');
      if (stored) {
        setResult(JSON.parse(stored));
      }
    }
  }, [location.state]);

  const downloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.text('Image Verification Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date(result.timestamp).toLocaleString()}`, 20, 30);
    doc.setFontSize(16);
    doc.text('Analysis Results:', 20, 50);
    doc.setFontSize(12);
    doc.text(`AI Generated: ${result.predicted_class === 1 ? 'Yes' : 'No'}`, 30, 60);
    doc.text(`Proof Valid: ${result.proofValid ? 'Yes' : 'No'}`, 30, 70);
    doc.text(`Confidence Scores:`, 30, 80);
    doc.text(`- AI Generated: ${(result.artificial_prob * 100).toFixed(2)}%`, 40, 90);
    doc.text(`- Human Generated: ${(result.human_prob * 100).toFixed(2)}%`, 40, 100);
    doc.text('Image Hash:', 20, 120);
    doc.text(result.image_hash.map(byte => byte.toString(16).padStart(2, '0')).join(''), 30, 130);
    doc.save('verification-report.pdf');
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Determine which probability is higher
  const aiIsHigher = result.artificial_prob >= result.human_prob;
  const aiPercent = (result.artificial_prob * 100).toFixed(2);
  const humanPercent = (result.human_prob * 100).toFixed(2);
  const isAI = result.artificial_prob >= 0.5;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Verification Results</h1>
          <div className="bg-gray-800 rounded-xl p-8 mb-8">
            {/* Result Header */}
            <div className="text-center mb-8">
              <div className={`text-6xl mb-4 ${isAI ? 'text-blue-400' : 'text-green-400'}`}>{isAI ? '🤖' : '👤'}</div>
              <h2 className="text-2xl font-bold mb-2">
                {isAI ? 'AI Generated' : 'Human Generated'}
              </h2>
              <p className="text-gray-400">
                Verified on {result.timestamp ? new Date(result.timestamp).toLocaleString() : ''}
              </p>
            </div>
            {/* Confidence Scores */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className={`bg-gray-700 rounded-lg p-6 ${aiIsHigher ? (isAI ? 'border-2 border-green-400' : 'border-2 border-red-400') : ''}`}>
                <h3 className="text-lg font-medium mb-2">AI Generated Probability</h3>
                <div className={`text-3xl font-bold ${isAI ? (aiIsHigher ? 'text-green-400' : 'text-red-400') : 'text-red-400'}`}>{aiPercent}%</div>
              </div>
              <div className={`bg-gray-700 rounded-lg p-6 ${!aiIsHigher ? (!isAI ? 'border-2 border-green-400' : 'border-2 border-red-400') : ''}`}>
                <h3 className="text-lg font-medium mb-2">Human Generated Probability</h3>
                <div className={`text-3xl font-bold ${!isAI ? (!aiIsHigher ? 'text-green-400' : 'text-red-400') : 'text-red-400'}`}>{humanPercent}%</div>
              </div>
            </div>
            {/* Proof Status */}
            <div className="bg-gray-700 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium mb-2">Zero-Knowledge Proof Status</h3>
              <div className={`text-xl font-bold ${result.proofValid ? 'text-green-400' : 'text-red-400'}`}>{result.proofValid ? 'Valid ✓' : 'Invalid ✗'}</div>
            </div>
            {/* Image Hash */}
            <div className="bg-gray-700 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium mb-2">Image Hash</h3>
              <p className="font-mono text-sm break-all">{result.image_hash && Array.isArray(result.image_hash) ? result.image_hash.map(byte => byte.toString(16).padStart(2, '0')).join('') : ''}</p>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={downloadPDF} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300">Download Report (PDF)</button>
              <button onClick={() => navigate('/home')} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300">Verify Another Image</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
