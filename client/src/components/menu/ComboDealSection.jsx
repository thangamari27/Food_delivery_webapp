import React from 'react'
import ComboHeader from './ComboDealsUI/ComboHeader';
import ComboDealCard from '@/components/common/ComboDealCard';
import { comboDealsContent } from '@/utils/constant/admin/MenuConstant'
import { comboStyles } from '@/utils/styles/MenuStyle';


function ComboDealSection({ content = comboDealsContent }) {
   const { header, combos, cta, currencyIcon } = content;
   const styles = comboStyles;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Combo deals sectiton Header  */}
        <ComboHeader header={header} styles={styles.header} />

        <ComboDealCard 
          combo={combos} 
          cta={cta} 
          currencyIcon={currencyIcon} 
          styles={styles.combo} 
        />
      </div>
    </section>
  )
}

export default ComboDealSection