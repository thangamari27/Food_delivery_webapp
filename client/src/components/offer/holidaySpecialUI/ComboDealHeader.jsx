import IconComponent from '@/components/common/IconComponent'
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'
import Button from '../../common/Button'

function ComboDealHeader({ content, styles }) {
  return (
    <div className={styles.container}>
        {/* Combo Deal header section badge */}
        <div className={styles.badge}>
            <Title title={content.title} titleStyle={styles.title} />
            <Paragraph paragraph={content.discount} paragraphStyle={styles.discount} />
        </div>
        {/* Combo Deal header section description */}
        <Paragraph paragraph={content.description} paragraphStyle={styles.description} />
        {/* Combo Deal header section button */}
        <div className={styles.buttonContainer}>
            <Button 
                buttonText={content.button.leftButton.text} 
                buttonStyle={styles.buttonLeft}
                buttonLink={content.button.leftButton.link}
            />
        </div>
        {/* Combo Deal header section price content */}
        <div className={styles.priceContainer}>
            <span className={styles.price}>
                <IconComponent Icon={content.icon} className={styles.icon} />
                {content.price}
            </span>
            <span className={styles.savings}>
                {content.savings}
            </span>
        </div>
    </div>
  )
}

export default ComboDealHeader