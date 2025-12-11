import React from 'react'
import IconBoolean from './IconBoolean';

function PlanCell({ value, styles }) {
  const isBool = typeof value === "boolean";
  return (
    <td className={styles.td}>
      {isBool ? (
        <IconBoolean value={value} styles={styles} />
      ) : (
        <span className={styles.textMuted}>{value}</span>
      )}
    </td>
  );
}

export default PlanCell