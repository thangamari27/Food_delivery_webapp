import PopularMenuItem from './PopularMenuItem'

function CarouselMarquee({
  doubled = [],
  itemsLength = 0,
  prefersReduced = false,
  speed = 25,
  isPaused = false,
  styles,
}) {
  return (
    <div
      className={styles.marqueeContainer}
      style={{
        animationDuration: prefersReduced ? "0s" : `${speed}s`,
        animationPlayState: isPaused || prefersReduced ? "paused" : "running",
        minWidth: "200%",
      }}
    >
      {doubled.map((item, i) => (
        <PopularMenuItem
          key={`${item.id ?? item.name}-${i}`}
          item={item}
          index={i}
          baseLength={itemsLength}
          styles={styles}
        />
      ))}
    </div>
  )
}

export default CarouselMarquee