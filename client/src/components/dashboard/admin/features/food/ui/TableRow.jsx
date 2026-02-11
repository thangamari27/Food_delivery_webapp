import { Eye, Edit, Trash2 } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';

function TableRow({ food, onView, onEdit, onDelete, styles }) {
  return (
    <tr key={food.fid} className={styles.table.row}>
      <td className={styles.table.cell}>
        <img 
          src={food.image?.url || food.image || '/food-placeholder.jpg'} 
          alt={food.name} 
          className={styles.table.image} 
        />
      </td>
      <td className={styles.table.cell}>
        <div>
          <p className="font-medium text-gray-900">{food.name}</p>
          <span className='block truncate max-w-[120px]'>
            {food.description || 'No description'}
          </span>
        </div>
      </td>
      <td className={`${styles.table.cell} hidden md:table-cell`}>
        <Badge type="category" styles={styles}>{food.category}</Badge>
      </td>
      <td className={`${styles.table.cell} hidden lg:table-cell`}>
        <Badge type="cuisine" styles={styles}>{food.cuisine}</Badge>
      </td>
      <td className={styles.table.cell}>
        <div className="flex items-center gap-2">
          <span className="font-semibold">${food.price?.toFixed(2)}</span>
          {food.originalPrice && food.originalPrice > food.price && (
            <span className="text-sm text-gray-500 line-through">
              ${food.originalPrice?.toFixed(2)}
            </span>
          )}
        </div>
      </td>
      <td className={`${styles.table.cell} hidden sm:table-cell`}>
        <Badge type="status" styles={styles}>
          {food.status || (food.isActive ? 'Active' : 'Inactive')}
        </Badge>
      </td>
      <td className={`${styles.table.cell} hidden xl:table-cell`}>
        <Badge type="type" styles={styles}>{food.type}</Badge>
      </td>
      <td className={styles.table.cell}>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onView(food)} 
            styles={styles}
            title="View Details"
          >
            <Eye size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onEdit(food)} 
            styles={styles}
            title="Edit"
          >
            <Edit size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDelete(food)} 
            styles={styles}
            title="Delete"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default TableRow;