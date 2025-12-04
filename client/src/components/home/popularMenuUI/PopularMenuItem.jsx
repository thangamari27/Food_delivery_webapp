import PopularMenuCard from "./PopularMenuCard"

function PopularMenuItem({ item, index, baseLength, styles }) {
  return (
    <div
      className={styles.shrinkImageContainer}
      aria-hidden={index >= baseLength ? "true" : "false"}
    >
        <PopularMenuCard item={item} styles={styles} />
    </div>
  )
}

export default PopularMenuItem