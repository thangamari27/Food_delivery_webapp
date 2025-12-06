import React from 'react'
import FilterButton from './FilterButton'

function FilterBar({ content, styles, activeCuisine, setActiveCuisine }) {
  return (
    <div className={styles.filterButton.container} style={styles.filterButton.noScrollbarStyle}>
      {content.cuisine.map((cuisineItem) => (
        <FilterButton 
          key={cuisineItem.id}
          label={cuisineItem.name}
          isActive={activeCuisine === cuisineItem.id}
          onClick={() => setActiveCuisine(cuisineItem.id)}
          activeColorClasses={styles.filterButton.activeColorClass}
          defaultColorClasses={styles.filterButton.defaultColorClass}
          styles={styles.filterButton}
        />
      ))}
    </div>
  )
}

export default FilterBar