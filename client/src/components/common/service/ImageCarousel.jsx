import { useState, useEffect } from "react"

function ImageCarousel({ images, styles }) {
   const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = images.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
        }, 3000);

        return () => clearInterval(interval);
    }, [totalSlides]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

  return (
    <div className={styles.carouselContainer}>
            <div className={styles.carouselWrapper}>
                <div 
                    className={styles.carouselSlider}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <img 
                            key={index}
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className={styles.carouselSlide}
                        />
                    ))}
                </div>
            </div>
            
            <div className={styles.carouselDots}>
                {images.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`${styles.carouselDot} ${
                            currentSlide === index ? styles.carouselDotActive : ''
                        }`}
                    />
                ))}
            </div>
        </div>
  )
}

export default ImageCarousel