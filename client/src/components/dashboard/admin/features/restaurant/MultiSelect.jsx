
function MultiSelect({ options, selected, onChange, label, error, required = true, styles }) {
  return (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex flex-wrap gap-2">
        {options.map(option => (
            <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`${styles.tags.base} ${
                selected.includes(option)
                ? styles.tags.selected
                : styles.tags.unselected
            }`}
            >
            {option}
            </button>
        ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default MultiSelect