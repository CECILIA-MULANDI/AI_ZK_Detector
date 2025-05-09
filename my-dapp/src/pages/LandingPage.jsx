import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#10192A] to-[#1E293B] text-white flex flex-col">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
        {/* Left: Headline and CTA */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Verify <span className="text-[#3fd0ff]">Image <span className="text-green-400">Authenticity</span></span><br />with <span className="text-[#3fd0ff]">ZK Proofs</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Ensure trust in digital media by proving the authenticity and edit history of images. Our ZK-powered verification stack helps developers and users detect AI-generated or manipulated content with ease.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="bg-[#3fd0ff] hover:bg-[#38bdf8] text-[#10192A] font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all duration-300"
          >
            Get Started for free
          </button>
        </div>
        {/* Right: Example Image with Badges */}
        <div className="flex-1 flex justify-center mt-12 md:mt-0">
          <div className="relative w-[320px] h-[320px] rounded-3xl overflow-hidden shadow-2xl bg-[#223a5a] flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80"
              alt="Example"
              className="object-cover w-full h-full"
            />
            {/* AI Generated Badge */}
            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center shadow-lg">
              <span className="mr-1">✖</span> AI Generated
            </div>
            {/* Authentic Image Badge */}
            <div className="absolute bottom-4 left-4 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center shadow-lg">
              <span className="mr-1">✔</span> Authentic Image
            </div>
          </div>
        </div>
      </div>
      {/* Features Bar */}
      <div className="w-full bg-[#1E293B] py-4 mt-8 shadow-inner">
        <div className="container mx-auto flex flex-wrap justify-center gap-6">
          <div className="flex items-center space-x-2 text-gray-200 text-sm font-semibold">
            <span>🛡️</span> <span>ZK-Powered Image Verification</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-200 text-sm font-semibold">
            <span>🔒</span> <span>Tamper-Proof Edit History</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-200 text-sm font-semibold">
            <span>⛓️</span> <span>Blockchain-Backed Security</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-200 text-sm font-semibold">
            <span>🤖</span> <span>AI-Deepfake Detection</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-200 text-sm font-semibold">
            <span>⚡</span> <span>Instant Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
} 