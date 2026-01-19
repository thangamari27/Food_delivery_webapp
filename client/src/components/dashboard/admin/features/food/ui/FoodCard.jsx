import { Eye, Edit, Trash2 } from 'lucide-react';
import Badge from './Badge';

function FoodCard({ food, onView, onEdit, onDelete, styles }) {
  return (
     <div className={styles.mobile.card}>
        <div className={styles.mobile.cardContent}>
        <div className="flex gap-4">
            <img src={food.image} alt={food.name} className="w-20 sm:w-24 h-20 sm:h-24 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base truncate">{food.name}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{food.category}</span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{food.cuisine}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-gray-900 text-sm">${food.price.toFixed(2)}</span>
                {food.originalPrice && (
                <span className="text-xs text-gray-500 line-through">${food.originalPrice.toFixed(2)}</span>
                )}
            </div>
            <div className="flex gap-2 flex-wrap">
                <Badge styles={styles} type="status">{food.status}</Badge>
                <Badge styles={styles} type="type">{food.type === 'Special Menu Item' ? 'Special' : 'Regular'}</Badge>
            </div>
            </div>
        </div>
        <div className={styles.mobile.cardGrid}>
            <button onClick={() => onView(food)} className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm">
            <Eye size={14} /><span className="hidden sm:inline">View</span>
            </button>
            <button onClick={() => onEdit(food)} className="flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm">
            <Edit size={14} /><span className="hidden sm:inline">Edit</span>
            </button>
            <button onClick={() => onDelete(food)} className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm">
            <Trash2 size={14} /><span className="hidden sm:inline">Delete</span>
            </button>
        </div>
        </div>
    </div>
  )
}

export default FoodCard