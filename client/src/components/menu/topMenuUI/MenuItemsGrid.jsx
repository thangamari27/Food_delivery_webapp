import TopMenuItem from '@/components/common/topCategory/TopMenuItem';

function MenuItemsGrid({ items, buttonContent, styles, isLiked, handleLikeToggle }) {
  return (
     <div className={styles.topCategoryCard.container}>
      {items.map((item) => (
        <TopMenuItem
          key={item.id}
          items={item}
          buttonContent={buttonContent}
          styles={styles.topCategoryCard}
          isLiked={isLiked(item.id || item._id)}
          onLikeToggle={handleLikeToggle}
        />
      ))}
    </div>
  )
}

export default MenuItemsGrid