import React from 'react'

function FilterCheckbox({ label, checked, onChange, styles }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={onChange} 
      className={`rounded border-gray-300 ${styles.theme.primaryText} ${styles.theme.primaryRing}`} 
    />
    <span className="text-sm">{label}</span>
  </label>
  )
}

export default FilterCheckbox