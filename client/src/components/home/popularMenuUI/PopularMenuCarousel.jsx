import { useState } from 'react'
import PopularMenuMarquee from "./PopularMenuMarquee";

function PopularMenuCarousel({ items = [], speed = 20, styles }) {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <PopularMenuMarquee
      items={items}
      speed={speed}
      styles={styles}
      isPaused={isPaused}
      setIsPaused={setIsPaused}
    />
  )
}

export default PopularMenuCarousel