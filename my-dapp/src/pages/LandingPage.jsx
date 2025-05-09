import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            AI Image Verification
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl">
            Verify the authenticity of your images using advanced AI technology and zero-knowledge proofs
          </p>
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-gray-800 p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-blue-400 text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-4">AI-Powered Analysis</h3>
            <p className="text-gray-400">Advanced machine learning algorithms to detect AI-generated images</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-blue-400 text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-4">Zero-Knowledge Proofs</h3>
            <p className="text-gray-400">Verify authenticity without revealing sensitive information</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-blue-400 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-4">Detailed Reports</h3>
            <p className="text-gray-400">Get comprehensive analysis and downloadable verification reports</p>
          </div>
        </div>
      </div>
    </div>
  );
} 