import IconComponent from '@/components/common/IconComponent'
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'

function ComboDealHeader({ content, styles }) {
  return (
    <div>
        {/* Combo Deal header section badge */}
        <div className={styles.badge}>
            <Title title={content.title} titleStyle={styles.title} />
            <Paragraph paragraph={content.discount} paragraphStyle={styles.discount} />
        </div>
        {/* Combo Deal header section description */}
        <Paragraph paragraph={content.description} paragraphStyle={styles.description} />
        {/* Combo Deal header section button */}
        <div className={styles.buttonContainer}>
            <button className={styles.buttonLeft}>
                <span className={styles.buttonLeftSize}>{content.button.leftButton.text}</span>
            </button>
            <button className={styles.buttonRight}>
                <span className={styles.buttonRightSize}>{content.button.rightButton.text}</span>
            </button>
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