import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    }
  };

  const handleProceed = () => {
    if (image) {
      // Store image in sessionStorage for next step
      const reader = new FileReader();
      reader.onload = () => {
        sessionStorage.setItem("uploadedImage", reader.result);
        sessionStorage.setItem("uploadedImageName", image.name);
        navigate("/verify");
      };
      reader.readAsDataURL(image);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Upload Image</h1>
          
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              isDragging ? 'border-blue-500 bg-blue-900/20' : 'border-gray-600'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer block"
            >
              <div className="text-6xl mb-4">📁</div>
              <p className="text-xl mb-2">Drag and drop your image here</p>
              <p className="text-gray-400 mb-4">or</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300">
                Browse Files
              </button>
            </label>
          </div>

          {image && (
            <div className="mt-8">
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{image.name}</p>
                    <p className="text-sm text-gray-400">
                      {(image.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleProceed}
                className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Proceed to Verification
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 