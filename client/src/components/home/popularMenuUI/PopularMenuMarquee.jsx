import { useMemo } from 'react'
import CarouselMarquee from './CarouselMarquee';

function PopularMenuMarquee({ items = [], speed = 25, styles, isPaused, setIsPaused }) {
  // duplicate items for smooth continuous marquee
  const doubled = useMemo(() => [...items, ...items], [items]);

  // check user motion preference (safely for SSR)
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <div className={styles.carouselContainer}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Popular menu items scrolling list"
    >
      {/* left/right fade overlays for nicer edges */}
      <div className={styles.leftFade} />
      <div className={styles.rightFade} />

      <CarouselMarquee
        doubled={doubled}
        itemsLength={items.length}
        prefersReduced={prefersReduced}
        speed={speed}
        isPaused={isPaused}
        styles={styles}
        />
    </div>
  )
}

export default PopularMenuMarquee