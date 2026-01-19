import { Eye, Edit, Trash2 } from 'lucide-react';
import Badge from './Badge';

function TableRow({ food, onView, onEdit, onDelete, styles }) {
  return (
    <tr className={styles.table.row}>
        <td className={styles.table.cell}>
        <img src={food.image} alt={food.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg" />
        </td>
        <td className={`${styles.table.cell} font-medium text-gray-900 text-sm sm:text-base`}>
        {food.name}
        </td>
        <td className={`${styles.table.cell} text-gray-600 hidden md:table-cell`}>
        {food.category}
        </td>
        <td className={`${styles.table.cell} text-gray-600 hidden lg:table-cell`}>
        {food.cuisine}
        </td>
        <td className={styles.table.cell}>
        <div className="flex flex-col">
            <span className="font-semibold text-gray-900">${food.price.toFixed(2)}</span>
            {food.originalPrice && (
            <span className="text-xs text-gray-500 line-through">${food.originalPrice.toFixed(2)}</span>
            )}
        </div>
        </td>
        <td className={`${styles.table.cell} hidden sm:table-cell`}>
        <Badge type="status" styles={styles}>{food.status}</Badge>
        </td>
        <td className={`${styles.table.cell} hidden xl:table-cell`}>
        <Badge type="type" styles={styles}>{food.type === 'Special Menu Item' ? 'Special' : 'Regular'}</Badge>
        </td>
        <td className={styles.table.cell}>
        <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => onView(food)} className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View">
            <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
            <button onClick={() => onEdit(food)} className="p-1.5 sm:p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Edit">
            <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
            <button onClick={() => onDelete(food)} className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
            <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
        </div>
        </td>
    </tr>
  )
}

export default TableRow