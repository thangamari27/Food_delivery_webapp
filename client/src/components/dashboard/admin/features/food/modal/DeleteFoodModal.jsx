import { AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import Modal from './Modal';

function DeleteFoodModal({ content, isOpen, onClose, food, onDelete, styles }) {
  if (!food) return null;

  return (
    <Modal
      styles={styles}
      isOpen={isOpen}
      onClose={onClose}
      title={content.modal.delete.title}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} styles={styles}>
            {content.modal.delete.cancelButton}
          </Button>
          <Button variant="danger" onClick={onDelete} styles={styles}>
            {content.modal.delete.confirmButton}
          </Button>
        </>
      }
    >
      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4 mx-auto">
          <AlertCircle className="text-red-600" size={24} />
        </div>
        <p className="text-gray-600 mb-4">
          {content.messages.deleteConfirm} "{food.name}"? {content.modal.delete.message}
        </p>
        <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          <img src={food.image} alt={food.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg" />
          <div className="text-left">
            <p className="font-medium text-gray-900">{food.name}</p>
            <p className="text-sm text-gray-600">{food.category}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteFoodModal