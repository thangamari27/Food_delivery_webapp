import Title from '../Title'
import SubTitle from '../SubTitle'
import Paragraph from '../Paragraph'
import Image from '../Image'

function CarasouelSlide( { slides, currentSlide, styles} ) {
  return (
    <>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slidesContainer} ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`${slide.bgColor} ${styles.slideWrapper}`}>
            <div className={styles.slideContent}>
              <Title title={slide.title} titleStyle={styles.slideTitle} />
              <SubTitle subTitle={slide.subtitle} subTitleStyle={styles.slideSubtitle}  />
              <Paragraph paragraph={slide.description} paragraphStyle={styles.slideDescription} />
            </div>
            <div className={styles.slideImageContainer}>
              <Image 
                src={slide.src} 
                srcFallback={slide.srcFallback} 
                alt={slide.alt} 
                pictureStyle={styles.slidePicture} 
                imageStyle={styles.slideImage} 
              />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default CarasouelSlide