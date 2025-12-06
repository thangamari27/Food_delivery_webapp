import Title from "@/components/common/Title"
import Paragraph from '@/components/common/Paragraph'
import Button from '@/components/common/Button'
import { IndianRupee } from "lucide-react"

function MenuCardContent({ dish, isFeatured, buttonText, styles}) {
  return (
    <div className={styles.menuContent}>
      {/* heading */}
      <Title title={dish.name} titleStyle={styles.menuTitle} />
      <Paragraph paragraph={dish.description} paragraphStyle={styles.menuDescription} />
      
      <div className={styles.priceContainer}>
        <span className={styles.price}>
            <IndianRupee className={styles.icon} />
            {dish.price}
        </span>
        <Button
            buttonText={buttonText.text}
            buttonLink={buttonText.link}
            buttonStyle={` ${styles.button}
            ${isFeatured ? styles.isfeatureButton : styles.featureButton }    
            `}
        />
      </div>
    </div>
  )
}

export default MenuCardContent