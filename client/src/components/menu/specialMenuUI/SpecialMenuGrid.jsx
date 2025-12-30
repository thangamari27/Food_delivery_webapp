import NotFound from '@/components/common/foodMenu/NotFound';
import DishCardSpecial from './DishCardSpecial'

function SpecialMenuGrid({ paginatedSpecialDishes, content, styles, likedItems, handleLikeToggle, activeCuisine }) {
  return (
    <div className={styles.specialMenu.gridContainer}>
      {paginatedSpecialDishes.length > 0 ? (
        paginatedSpecialDishes.map((dish) => (
          <DishCardSpecial
            key={dish.id}
            dish={dish}
            buttonText={content.specialMenuButton}
            isLiked={likedItems.has(dish.id)}
            onLikeToggle={handleLikeToggle}  
            styles={styles.specialMenu}                  
          />
        ))
      ) : (
        <NotFound message={` ${content.notFound.message} '${content.cuisine.find(c => c.id === activeCuisine)?.name}' cuisine.`} />
      )}
    </div>
  )
}

export default SpecialMenuGrid