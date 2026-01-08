import { useRef } from 'react';
import { Upload, X } from 'lucide-react';

function ImageUpload({ content, image, onChange, error, styles }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert(content.validation.fileSize);
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert(content.validation.imageType);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className=''>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {content.labels.restaurantImage}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
        {image ? (
          <div className="relative">
            <img src={image} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <Upload size={32} className="text-gray-400" />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              <Upload size={18} className="inline mr-2" />
              {content.labels.uploadImage}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              {content.labels.imageRequirements}
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default ImageUpload