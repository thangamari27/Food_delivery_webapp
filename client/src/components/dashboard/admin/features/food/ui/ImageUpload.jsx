import React from 'react';
import { Upload, X } from 'lucide-react';

function ImageUpload({ content, preview, onChange, styles }) {
  const handleRemove = (e) => {
    e.stopPropagation();
    // Reset file input
    const fileInput = document.getElementById('food-image-upload');
    if (fileInput) {
      fileInput.value = '';
    }
    // Trigger change event with empty file
    onChange({ target: { files: [] } });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center w-full">
        <label 
          htmlFor="food-image-upload" 
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative"
        >
          {preview ? (
            <div className="relative w-full h-full">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, WebP up to 5MB
              </p>
            </div>
          )}
          <input 
            id="food-image-upload"
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={onChange}
          />
        </label>
      </div>
      <p className="text-xs text-gray-500">
        Recommended: Square image (1:1 ratio) for best display
      </p>
    </div>
  );
}

export default ImageUpload;