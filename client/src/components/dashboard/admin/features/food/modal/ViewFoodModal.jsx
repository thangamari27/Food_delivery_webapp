import { Edit } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Modal from './Modal';

function ViewFoodModal({ content, isOpen, onClose, food, onEdit, styles }) {
  if (!food) return null;

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
        <img src={food.image} alt={food.name} className="w-full h-48 sm:h-64 object-cover rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{content.form.name.label}</h3>
            <p className="text-base sm:text-lg font-semibold text-gray-900">{food.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{content.form.restaurant.label}</h3>
            <p className="text-base sm:text-lg text-gray-900">{food.restaurant || 'N/A'}</p>
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
              <p className="text-base sm:text-lg font-semibold text-gray-900">${food.price.toFixed(2)}</p>
              {food.originalPrice && (
                <p className="text-sm text-gray-500 line-through">${food.originalPrice.toFixed(2)}</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{content.form.status.label}</h3>
            <Badge type="status" styles={styles}>{food.status}</Badge>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-1">{content.form.description.label}</h3>
            <p className="text-gray-900">{food.description}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Created Date</h3>
            <p className="text-gray-900">{new Date(food.createdDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ViewFoodModal