import Title from "@/components/common/Title"
import Paragraph from '@/components/common/Paragraph'
import Button from '@/components/common/Button'
import ButtonClick from '@/components/common/ButtonClick'
import { IndianRupee, ShoppingCart, Eye } from "lucide-react"

function MenuCardContent({ 
  dish, 
  isFeatured, 
  buttonText, 
  styles, 
  onViewClick,
  onAddToCart,
  itemInCart = false 
}) {
  return (
    <div className={styles.menuContent}>
      {/* heading */}
      <Title title={dish.name} titleStyle={styles.menuTitle} />
      <Paragraph paragraph={dish.description} paragraphStyle={styles.menuDescription} />
      
      <span className={styles.price}>
        <IndianRupee className={styles.icon} />
        {dish.price}
      </span>
      
      <div className={styles.priceContainer}>
        {/* View Details Button */}
        <ButtonClick
          text={
            <span className="flex items-center gap-2">
              <Eye size={16} />
              {buttonText.btntext1}
            </span>
          }
          buttonStyle={styles.button1}
          onClick={onViewClick}      
        />

        {/* Add to Cart Button */}
        <ButtonClick
          text={
            <span className="flex items-center gap-2">
              <ShoppingCart size={16} />
              {itemInCart ? 'In Cart' : buttonText.btntext2}
            </span>
          }
          buttonStyle={`${styles.button2} ${itemInCart ? 'bg-orange-500 hover:bg-ornage-600 outline-none' : ''}`}
          onClick={onAddToCart}
        />
      </div>
    </div>
  )
}

export default MenuCardContent