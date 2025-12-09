import { holidaySpecialContent } from "@/utils/constant/admin/OfferConstant"
import { holidaySpecialStyle } from "@/utils/styles/OfferStyle"
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'
import ComboDealCard from '@/components/common/ComboDealCard'
import MainComboDeal from "./holidaySpecialUI/MainComboDeal"

function HolidaySpecialSection() {
  const content = holidaySpecialContent;
  const styles = holidaySpecialStyle;

  return (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className={styles.header.container}>
                <Title title={content.header.title} titleStyle={styles.header.title} />
                <Paragraph paragraph={content.header.description} paragraphStyle={styles.header.description} />
            </div>
            <div>
                {/* combo deal section */}
                <ComboDealCard 
                    combo={content.combos}
                    cta={content.cta}
                    currencyIcon={content.currencyIcon}
                    styles={styles.combo}
                />

                {/* Main combo deal section */}
                <MainComboDeal 
                    content={content.mainCombo}
                    styles={styles.mainCombo}
                />
            </div>
        </div>
    </section>
  )
}

export default HolidaySpecialSection