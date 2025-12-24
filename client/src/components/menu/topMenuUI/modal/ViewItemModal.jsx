// components/common/topCategory/ViewItemModal.jsx
import { X, IndianRupee, Star, Clock, Users } from 'lucide-react';
import { useEffect } from 'react';
import Image from '../Image';

function ViewItemModal({ isOpen, onClose, item, buttonContent, styles }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`
      fixed inset-0 z-[9999] flex items-center justify-center p-4
      transition-all duration-300 ease-out
      ${isOpen 
        ? 'opacity-100 visible bg-black/40 backdrop-blur-sm' 
        : 'opacity-0 invisible bg-transparent backdrop-blur-none pointer-events-none'
      }
    `}>
      
      {/* Click outside to close */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal content */}
      <div className={`
        relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden
        transform transition-all duration-300 ease-out
        ${isOpen 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-4 opacity-0 scale-95'
        }
      `}>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg"
        >
          <X size={24} />
        </button>

        {/* Modal body */}
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Image */}
          <div className="lg:w-1/2 p-8 bg-gray-50 flex items-center justify-center">
            <div className="relative w-full h-64 lg:h-96">
              <Image 
                src={item.src}
                srcFallback={item.srcFallback}
                alt={item.name}
                pictureStyle="w-full h-full"
                imageStyle="w-full h-full object-cover rounded-2xl"
              />
              
              {/* Badge for discount */}
              {item.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Right side - Details */}
          <div className="lg:w-1/2 p-8 overflow-y-auto max-h-[70vh]">
            <div className="space-y-6">
              {/* Title and rating */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h2>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        size={18}
                        className={i < (item.rating || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({item.reviews || 120} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{item.description || "Delicious and freshly prepared with the finest ingredients."}</p>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ingredients</h3>
                <p className="text-gray-600">{item.ingredients}</p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Clock size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Prep Time</p>
                    <p className="font-semibold">{item.prepTime || "15-20 mins"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Serves</p>
                    <p className="font-semibold">{item.serves || "2-3 People"}</p>
                  </div>
                </div>
              </div>

              {/* Price section */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center mb-1">
                      <IndianRupee className="text-gray-900" size={28} />
                      <span className="text-3xl font-bold text-gray-900 ml-1">
                        {item.price}
                      </span>
                    </div>
                    {item.originalPrice && (
                      <div className="flex items-center">
                        <IndianRupee className="text-gray-400 line-through" size={18} />
                        <span className="text-lg text-gray-400 line-through ml-1">
                          {item.originalPrice}
                        </span>
                        <span className="ml-2 text-sm font-semibold text-red-600">
                          Save ₹{item.originalPrice - item.price}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => {
                      console.log(`Added ${item.name} to cart`);
                      // We'll integrate with cart context later
                      onClose();
                    }}
                    className="px-8 py-3 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-500 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 py-3 border-2 border-amber-400 text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors">
                    {buttonContent.btnText1}
                  </button>
                  <button
                    onClick={() => {
                      console.log(`Quick add: ${item.name}`);
                      // Add quick add logic here
                    }}
                    className="flex-1 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {buttonContent.btnText2}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewItemModal;