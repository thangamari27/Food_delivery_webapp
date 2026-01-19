import { useState, useCallback } from 'react'
import { Check, X } from 'lucide-react'

function ComparisonTable({ content, comparisonData, onUpdateComparison, styles }) {
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleCellClick = useCallback((rowIndex, planType) => {
    const currentValue = comparisonData[planType][rowIndex];
    setEditingCell({ rowIndex, planType });
    setEditValue(typeof currentValue === 'boolean' ? currentValue : String(currentValue));
  }, [comparisonData]);

  const handleCellSave = useCallback(() => {
    if (editingCell) {
      onUpdateComparison(editingCell.rowIndex, editingCell.planType, editValue);
      setEditingCell(null);
      setEditValue('');
    }
  }, [editingCell, editValue, onUpdateComparison]);

  const handleCellBlur = useCallback(() => {
    handleCellSave();
  }, [handleCellSave]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleCellSave();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
      setEditValue('');
    }
  }, [handleCellSave]);

  return (
     <div className={`${styles.table.container} mt-8`}>
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className={styles.typography.heading_2}>
          {comparisonData.title}
        </h2>
        <p className={`${styles.typography.body_small} mt-1`}>
          {content.comparison.description}
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {comparisonData.table_title.map((title, index) => (
                <th key={index} scope="col" className={styles.table.header}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comparisonData.features.map((feature, rowIndex) => (
              <tr key={rowIndex} className={styles.table.row}>
                <td className={`${styles.table.cell} font-medium text-gray-900`}>
                  {feature}
                </td>
                {['basic', 'family', 'premium'].map((planType) => {
                  const value = comparisonData[planType][rowIndex];
                  const isBoolean = typeof value === 'boolean';
                  const isEditing = editingCell?.rowIndex === rowIndex && 
                                   editingCell?.planType === planType;
                  
                  return (
                    <td 
                      key={planType} 
                      className={styles.table.cell}
                      onClick={() => handleCellClick(rowIndex, planType)}
                    >
                      {isBoolean ? (
                        <div className="flex justify-start cursor-pointer">
                          {value ? (
                            <Check className={`${styles.icon.medium} ${styles.icon.success}`} />
                          ) : (
                            <X className={`${styles.icon.medium} ${styles.icon.danger}`} />
                          )}
                        </div>
                      ) : isEditing ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleCellBlur}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          className="w-full px-2 py-1 border border-orange-500 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <span className="text-gray-700 cursor-pointer hover:text-orange-600">
                          {value}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ComparisonTable