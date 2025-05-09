import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="text-xl font-bold text-white cursor-pointer"
            onClick={() => navigate('/')}
          >
            AI ZK Detector
          </div>

          {/* Navigation */}
          <nav className="flex space-x-4">
            <button
              onClick={() => navigate('/home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/home')
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Verify
            </button>
            <button
              onClick={() => navigate('/history')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/history')
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              History
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
} 