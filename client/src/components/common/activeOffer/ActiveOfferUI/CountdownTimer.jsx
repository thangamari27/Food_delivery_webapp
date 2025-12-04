import { offerContent, offerConfig } from '@/utils/constant/user/HomeConstant'
import { WaveSVG } from './WaveSVG';
import FoodImage from './FoodImage';
import ExpireOffer from './ExpireOffer';
import OfferAnimation from './OfferAnimation';
import useCountdown from '@/hooks/useCountdown';
import TimeCard from './TimeCard';

function CountdownTimer({ offerContent, offerConfig, styles}) {
  const { timeLeft, animatingUnit } = useCountdown(offerConfig.endDate, offerConfig.timeInterval);

  if (timeLeft.expired) {
    return <ExpireOffer 
    offerExpire={offerContent.offerExpire}  
    offerExpireDescription={offerContent.offerExpireDescription}
    />
  }

  return (
     <div className={styles.container}>
      {/* Animated Background Elements */}
      <OfferAnimation styles={styles.offerAnimate} />

      {/* Wave Effect */}
      <WaveSVG />

      {/* Left Food Image */}
      <FoodImage
        src={offerConfig.images.left.src}
        alt={offerConfig.images.left.alt}
        className={offerConfig.images.left.className}
        position={styles.foodImage.leftPosition}
        styles={styles.foodImage}
      />

      {/* Right Food Image */}
      <FoodImage
        src={offerConfig.images.right.src}
        alt={offerConfig.images.right.alt}
        className={offerConfig.images.right.className}
        position={styles.foodImage.rightPosition}
        styles={styles.foodImage}
      />

      {/* Main Content */}
      <TimeCard offerContent={offerContent} timeLeft={timeLeft} animatingUnit={animatingUnit} styles={styles.timeCard} />
    </div>
  )
}

export default CountdownTimer