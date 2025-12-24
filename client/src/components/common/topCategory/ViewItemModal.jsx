// components/common/topCategory/ViewItemModal.jsx
import { X, IndianRupee } from 'lucide-react';
import { useEffect } from 'react';
import Image from '../Image';

function ViewItemModal({ isOpen, onClose, item }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e) => e.key === 'Escape' && onClose();
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-xl">
        {/* Header */}
        <div className="relative">
          <Image 
            src={item.src}
            srcFallback={item.srcFallback}
            alt={item.name}
            pictureStyle="w-full"
            imageStyle="w-full h-48 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 bg-white rounded-full shadow"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h2>
          <p className="text-gray-600 text-sm mb-3">{item.ingredients}</p>
          
          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <IndianRupee size={18} />
              <span className="text-xl font-bold ml-1">{item.price}</span>
              {item.originalPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  ₹{item.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center border rounded">
              <button className="px-3 py-1">-</button>
              <span className="px-3 py-1">1</span>
              <button className="px-3 py-1">+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                console.log(`Added ${item.name} to cart`);
                onClose();
              }}
              className="flex-1 py-2 bg-amber-400 text-gray-900 font-semibold rounded-lg hover:bg-amber-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewItemModal;