import OfferBadge from './OfferBadge';
import TimerBox from './TimerBox ';
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'
import Button from '@/components/common/Button'

function TimeCard({ offerContent, timeLeft, animatingUnit, styles }) {
  return (
    <div className={styles.container}>
        <OfferBadge text={offerContent.badge} styles={styles.offerBadge} />

        <Title title={offerContent.title} titleStyle={styles.title} />

        <Paragraph paragraph={offerContent.description.description} paragraphStyle={styles.description} />

        {/* Timer Boxes */}
        <div className={styles.timeBox.container}>
          <TimerBox 
            value={timeLeft.days} 
            label={offerContent.labels.days}
            isAnimating={animatingUnit === 'days'}
            styles={styles.timeBox}
          />
          <TimerBox 
            value={timeLeft.hours} 
            label={offerContent.labels.hours}
            isAnimating={animatingUnit === 'hours'}
            styles={styles.timeBox}
          />
          <TimerBox 
            value={timeLeft.minutes} 
            label={offerContent.labels.minutes}
            isAnimating={animatingUnit === 'minutes'}
            styles={styles.timeBox}
          />
          <TimerBox 
            value={timeLeft.seconds} 
            label={offerContent.labels.seconds}
            isAnimating={animatingUnit === 'seconds'}
            styles={styles.timeBox}
          />
        </div>

        {/* Call to Action */}
        <Button 
          buttonText={offerContent.button.buttonText} 
          buttonLink={offerContent.button.buttonLink} 
          buttonStyle={styles.button} 
        />
      </div>
  )
}

export default TimeCard