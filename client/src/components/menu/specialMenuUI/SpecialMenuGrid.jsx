import NotFound from '@/components/common/foodMenu/NotFound';
import DishCardSpecial from './DishCardSpecial'

function SpecialMenuGrid({ 
  paginatedSpecialDishes, 
  content, 
  styles, 
  isLiked, 
  handleLikeToggle, 
  activeCuisine 
}) {
  return (
    <div className={styles.specialMenu.gridContainer}>
      {paginatedSpecialDishes.length > 0 ? (
        paginatedSpecialDishes.map((dish) => (
          <DishCardSpecial
            key={dish.id}
            dish={dish}
            buttonText={content.specialMenuButton}
            // Call isLiked function instead of likedItems.has()
            isLiked={isLiked(dish.id || dish._id)}  
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