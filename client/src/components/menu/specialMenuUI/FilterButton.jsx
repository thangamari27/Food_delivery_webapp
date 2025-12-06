function FilterButton({ label, isActive, onClick, activeColorClasses = 'bg-green-700 text-white', defaultColorClasses = 'bg-gray-100 text-gray-700', styles }) {
  return (
     <button
        className={`${styles.wrapper}
        ${isActive ? activeColorClasses : defaultColorClasses}
        ${styles.buttonHover} ${isActive ? activeColorClasses : `${styles.focusRing}`}`}
        onClick={onClick}
    >
    {label}
  </button>
  )
}

export default FilterButton