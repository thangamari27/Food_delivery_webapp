import SpecialMenuCard from "./SpecialMenuCard";

function SpecialMenuItems({specialMenuContent, styles}) {
  return (
     <div className={styles.specialMenuCard.grid}>
      {specialMenuContent.map((foodItems) => (
        <SpecialMenuCard key={foodItems.id} item={foodItems} styles={styles} />
      ))}
    </div>
  )
}

export default SpecialMenuItems