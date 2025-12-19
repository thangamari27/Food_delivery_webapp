import React from 'react'
import TopMenuItem from '@/components/common/topCategory/TopMenuItem';

function MenuItemsGrid({ items, buttonContent, styles }) {
  return (
     <div className={styles.topCategoryCard.container}>
      {items.map((item) => (
        <TopMenuItem
          key={item.id}
          items={item}
          buttonContent={buttonContent}
          styles={styles.topCategoryCard}
        />
      ))}
    </div>
  )
}

export default MenuItemsGrid