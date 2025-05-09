import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-[#10192A] border-b border-[#1E293B] shadow-md">
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo and Brand */}
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}> 
          <span className="inline-flex items-center mr-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#1E293B"/>
              <path d="M16 8L24 12V20L16 24L8 20V12L16 8Z" fill="#3fd0ff"/>
              <path d="M16 12V20" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="16" cy="16" r="2" fill="#fff"/>
            </svg>
          </span>
          <span className="text-2xl font-extrabold text-white tracking-tight">
            <span className="text-[#3fd0ff]">Pixel</span>Shield
          </span>
        </div>
        {/* Navigation */}
        <nav className="flex items-center space-x-2 md:space-x-6">
          <button
            onClick={() => navigate('/home')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${isActive('/home') ? 'bg-[#3fd0ff] text-[#10192A]' : 'text-white hover:bg-[#1E293B]'}`}
          >
            Home
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-lg font-semibold border border-[#3fd0ff] text-[#3fd0ff] bg-transparent hover:bg-[#3fd0ff] hover:text-[#10192A] transition-colors duration-200"
          >
            Login
          </button>
        </nav>
      </div>
    </header>
  );
} 