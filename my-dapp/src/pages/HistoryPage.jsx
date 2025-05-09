import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
  const [verifications, setVerifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching past verifications
    const mockVerifications = [
      {
        id: 1,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        predicted_class: 1,
        artificial_prob: 0.92,
        human_prob: 0.08,
        proofValid: true,
        image_hash: Array(32).fill(0).map(() => Math.floor(Math.random() * 256)),
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        predicted_class: 0,
        artificial_prob: 0.15,
        human_prob: 0.85,
        proofValid: true,
        image_hash: Array(32).fill(0).map(() => Math.floor(Math.random() * 256)),
      },
    ];
    setVerifications(mockVerifications);
  }, []);

  const viewDetails = (verification) => {
    // Store verification in session storage and navigate to results
    sessionStorage.setItem('currentVerification', JSON.stringify(verification));
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Verification History</h1>
            <button
              onClick={() => navigate('/home')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300"
            >
              New Verification
            </button>
          </div>

          {verifications.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <p className="text-xl text-gray-400">No verification history found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {verifications.map((verification) => (
                <div
                  key={verification.id}
                  className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer"
                  onClick={() => viewDetails(verification)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`text-3xl ${verification.predicted_class === 1 ? 'text-red-500' : 'text-green-500'}`}>
                        {verification.predicted_class === 1 ? '🤖' : '👤'}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">
                          {verification.predicted_class === 1 ? 'AI Generated' : 'Human Generated'}
                        </h3>
                        <p className="text-gray-400">
                          {new Date(verification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400 mb-1">Confidence</div>
                      <div className={`font-bold ${verification.predicted_class === 1 ? 'text-red-400' : 'text-green-400'}`}>
                        {(verification.predicted_class === 1 ? verification.artificial_prob : verification.human_prob * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 