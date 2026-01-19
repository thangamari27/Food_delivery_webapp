import React from 'react'
import { Upload } from 'lucide-react';

function ImageUpload({ content, preview, onChange, styles }) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4">
        {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />}
        <label className="flex-1 w-full sm:w-auto flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
        <Upload className="mb-2 text-gray-400" size={32} />
        <p className="text-sm text-gray-600">Click to upload</p>
        <p className="text-xs text-gray-500 mt-1">{content.form.image.helper}</p>
        <input type="file" className="hidden" accept="image/*" onChange={onChange} />
        </label>
    </div>
  )
}

export default ImageUpload