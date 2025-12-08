import { ChevronLeft, ChevronRight } from 'lucide-react'
import BenefitCard from './BenefitCard'

function BenefitCarousel({ benefits, currentIndex, prevSlide, nextSlide, styles }) {
  return (
    <div className={styles.container}>
        <div className={styles.lgWrapper}>
            {/* Left button */}
            <button
                onClick={prevSlide}
                className={styles.leftButton}
                aria-label='Previous benefits'
            >
                <ChevronLeft className={styles.iconLeft} />
            </button>
            {/* User Benefit Card */}
            <div className={styles.cardGrid}>
                {benefits.slice(currentIndex, currentIndex + 4).map((benefit) => (
                    <BenefitCard key={benefit.id} 
                        benefit={benefit} 
                        styles={styles.benefitCard} 
                    />
                ))}
            </div>

            {/* Right Button */}
            <button
                onClick={nextSlide}
                className={styles.rightButton}
                aria-label="Next benefits"
            >
                <ChevronRight className={styles.iconRight} />
            </button>
        </div>
        <div className={styles.mdWrapper}>
            {benefits.slice(0, 6).map((benefit) => (
                <BenefitCard key={benefit.id} benefit={benefit} styles={styles.benefitCard} />
            ))}
        </div>
        <div className={styles.smWrapper}>
            {benefits.slice(0, 4).map((benefit) => (
                <BenefitCard key={benefit.id} benefit={benefit} styles={styles.benefitCard} />
            ))}
        </div>
    </div>
  )
}

export default BenefitCarousel