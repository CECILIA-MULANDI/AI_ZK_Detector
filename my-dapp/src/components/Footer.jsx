export default function Footer() {
  return (
    <footer className="bg-[#10192A] border-t border-[#1E293B] py-8 mt-12">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center">
        <div className="flex items-center mb-4">
          <span className="inline-flex items-center mr-2">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#1E293B"/>
              <path d="M16 8L24 12V20L16 24L8 20V12L16 8Z" fill="#3fd0ff"/>
              <path d="M16 12V20" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="16" cy="16" r="2" fill="#fff"/>
            </svg>
          </span>
          <span className="text-xl font-extrabold text-white tracking-tight">
            <span className="text-[#3fd0ff]">Pixel</span>Shield
          </span>
        </div>
        <div className="text-gray-400 text-sm mb-2 text-center">
          Copyright © {new Date().getFullYear()} Pixelshield. All Rights Reserved
        </div>
        <div className="flex space-x-6 mt-2">
          <a href="#" className="text-gray-400 hover:text-[#3fd0ff] transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-[#3fd0ff] transition-colors duration-200">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-[#3fd0ff] transition-colors duration-200">Contact</a>
        </div>
      </div>
    </footer>
  );
} 