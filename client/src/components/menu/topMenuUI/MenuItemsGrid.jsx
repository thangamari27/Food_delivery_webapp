import React from 'react'
import TopMenuItem from '@/components/common/topCategory/TopMenuItem';

function MenuItemsGrid({ items, styles }) {
  return (
     <div className={styles.topCategoryCard.container}>
      {items.map((item) => (
        <TopMenuItem
          key={item.id}
          items={item}
          styles={styles.topCategoryCard}
        />
      ))}
    </div>
  )
}

export default MenuItemsGrid