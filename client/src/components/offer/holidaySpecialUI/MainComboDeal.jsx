import ComboDealHeader from "./ComboDealHeader"
import ComboDealCard from "./ComboDealCard"

function MainComboDeal({ content, styles}) {
  return (
     <div className={styles.container}>
      <div className={styles.grid}>
        {/* special Combo Deal header */}
        <ComboDealHeader 
            content={content.leftContent}
            styles={styles.leftContent}
        />
        
        {/* special Combo Deal header */}
        <ComboDealCard 
            content={content.mainImage}
            styles={styles.rightCard}
        />
      </div>
    </div>
  )
}

export default MainComboDeal