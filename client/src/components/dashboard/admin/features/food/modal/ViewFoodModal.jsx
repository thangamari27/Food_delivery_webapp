import { Edit } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Modal from './Modal';

function ViewFoodModal({ content, isOpen, onClose, food, onEdit, styles }) {
  if (!food) return null;

  // Format price with safety check
  const formatPrice = (price) => {
    if (!price && price !== 0) return 'N/A';
    return `$${parseFloat(price).toFixed(2)}`;
  };

  // Format date with safety check
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return 'Invalid Date';
    }
  };

  return (
    <Modal
      styles={styles}
      isOpen={isOpen}
      onClose={onClose}
      title={content.modal.view.title}
      footer={
        <Button onClick={() => { onClose(); onEdit(food); }} styles={styles}>
          <Edit size={18} />
          {content.modal.view.editButton}
        </Button>
      }
    >
      <div className="space-y-6">
        <img 
          src={food.image?.url || food.image || '/food-placeholder.jpg'} 
          alt={food.name} 
          className="w-full h-48 sm:h-64 object-cover rounded-lg" 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{content.form.name.label}</h3>
            <p className="text-base sm:text-lg font-semibold text-gray-900">{food.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{content.form.restaurant.label}</h3>
            <p className="text-base sm:text-lg text-gray-900">{food.restaurantName || food.restaurant || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{content.form.category.label}</h3>
            <p className="text-base sm:text-lg text-gray-900">{food.category}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{content.form.cuisine.label}</h3>
            <p className="text-base sm:text-lg text-gray-900">{food.cuisine}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{content.form.type.label}</h3>
            <Badge type="type" styles={styles}>{food.type}</Badge>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{content.form.price.label}</h3>
            <div className="flex items-center gap-2">
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                {formatPrice(food.price)}
              </p>
              {food.originalPrice && food.originalPrice > food.price && (
                <p className="text-sm text-gray-500 line-through">
                  {formatPrice(food.originalPrice)}
                </p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{content.form.status.label}</h3>
            <Badge type="status" styles={styles}>
              {food.status || (food.isActive ? 'Active' : 'Inactive')}
            </Badge>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-1">{content.form.description.label}</h3>
            <p className="text-gray-900">{food.description || 'No description available'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Created Date</h3>
            <p className="text-gray-900">{formatDate(food.create_at)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Food ID</h3>
            <p className="text-gray-900 text-sm font-mono truncate">{food.fid}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ViewFoodModal;