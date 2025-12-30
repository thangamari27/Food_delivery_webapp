import SpecialMenuHeader from './specialMenuUI/SpecialMenuHeader'
import SpecialMenuItems from './specialMenuUI/SpecialMenuItems'
import Button from '@/components/common/Button'
import { specialMenuContent } from '@/utils/constant/admin/HomeConstant'
import { specialMenuStyles } from '@/utils/styles/HomeStyle'

function SpecialMenuSection() {
  const styles = specialMenuStyles;
  return (
    <section className={styles.section}>
        <div className={styles.container}>
            {/* Special menu Header */}
            <SpecialMenuHeader 
              title={specialMenuContent.title} 
              description={specialMenuContent.description} 
              styles={styles.header}
            />

            {/* Special food item card */}
            <SpecialMenuItems 
              specialMenuContent={specialMenuContent.specialMenuData} 
              styles={styles} 
            />

            {/* View All special food item button */}
            <div className={styles.header.container}>
              <Button 
                buttonText={specialMenuContent.button.buttonText} 
                buttonLink={specialMenuContent.button.buttonLink}
                buttonStyle={styles.header.button}
              />
            </div>
        </div>
    </section>
  )
}

export default SpecialMenuSection