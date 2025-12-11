import React from 'react'
import PlanCell from './PlanCell';

function ComparisonRow({ feature, rowIndex, plans, styles }) {
  return (
    <tr className={styles.tr}>
      <td className={styles.tdFirst}>{feature}</td>
      <PlanCell value={plans.basic[rowIndex]} styles={styles} />
      <PlanCell value={plans.family[rowIndex]}  styles={styles} />
      <PlanCell value={plans.premium[rowIndex]} styles={styles} />
    </tr>
  );
}

export default ComparisonRow