import React from 'react'
import ComboGrid from './ComboDeals/ComboGrid'

function ComboDealCard({ combo, cta, currencyIcon ,styles}) {
  return (
    <ComboGrid 
        combos={combo}
        cta={cta}
        currencyIcon={currencyIcon}
        styles={styles}
    />
  )
}

export default ComboDealCard