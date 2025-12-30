import { IndianRupee } from "lucide-react";
import Title from '@/components/common/Title';
import Paragraph from '@/components/common/Paragraph';

function MenuContent({itemName, description, price, contentStyle}) {
  return (
    <div className={contentStyle.menuContent}>
        <Title title={itemName} titleStyle={contentStyle.titleStyle}/>
        <Paragraph paragraph={description} paragraphStyle={contentStyle.descriptionStyle} />
        <div className={contentStyle.priceContainer}>
          <IndianRupee className={contentStyle.priceIcon} />
          <span className={contentStyle.price}>{price}</span>
        </div>
      </div>
  )
}

export default MenuContent