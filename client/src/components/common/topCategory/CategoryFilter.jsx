import React from 'react'

function CategoryFilter({ categories, activeFilter, onFilterChange, styles }) {
  const handleCategoryClick = (category) => {
    onFilterChange(category);
  };

  return (
    <div className={styles.base}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`
            ${styles.button.base}
            ${activeFilter === category 
              ? styles.button.active 
              : styles.button.inactive}
          `}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter