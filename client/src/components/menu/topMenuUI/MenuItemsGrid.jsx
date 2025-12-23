import React from 'react'
import TopMenuItem from '@/components/common/topCategory/TopMenuItem';

function MenuItemsGrid({ items, buttonContent, styles, likedItems, handleLikeToggle }) {
  return (
     <div className={styles.topCategoryCard.container}>
      {items.map((item) => (
        <TopMenuItem
          key={item.id}
          items={item}
          buttonContent={buttonContent}
          styles={styles.topCategoryCard}
          isLiked={likedItems.has(item.id)}
          onLikeToggle={handleLikeToggle}
        />
      ))}
    </div>
  )
}

export default MenuItemsGrid