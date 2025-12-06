import React from 'react'
import ComboCard from "./ComboCard";

function ComboGrid({ combos = [], currencyIcon, cta, styles }) {
  return (
    <div className={styles.grid}>
      {combos.map((combo) => (
        <ComboCard 
          key={combo.id} 
          combo={combo} 
          currencyIcon={currencyIcon} 
          cta={cta} 
          styles={styles} 
        />
      ))}
    </div>
  )
}

export default ComboGrid