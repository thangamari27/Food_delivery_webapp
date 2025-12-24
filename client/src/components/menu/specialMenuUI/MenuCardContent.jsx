import Title from "@/components/common/Title"
import Paragraph from '@/components/common/Paragraph'
import Button from '@/components/common/Button'
import ButtonClick from '@/components/common/ButtonClick'
import { IndianRupee } from "lucide-react"

function MenuCardContent({ dish, isFeatured, buttonText, styles, onViewClick }) {
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
        <ButtonClick
          text={buttonText.btntext1}
          buttonStyle={styles.button1}
          onClick={onViewClick}      
        />

        <Button
          buttonText={buttonText.btntext2}
          buttonLink={buttonText.btnlink2}
          buttonStyle={` ${styles.button2}`}
        />
      </div>
    </div>
  )
}

export default MenuCardContent