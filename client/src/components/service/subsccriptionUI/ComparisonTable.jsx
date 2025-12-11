import React from 'react'
import ComparisonRow from './ComparisonRow';

function ComparisonTable({ data , styles}) {
  
  const plans = {
    basic: data.basic ?? [],
    family: data.family ?? [],
    premium: data.premium ?? [],
  };
  return (
     <div className={styles.comparisonSection}>
      <h2 className={styles.comparisonTitle}>{data.title}</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table} role="table" aria-label="Plans comparison">
          <thead className={styles.thead}>
            <tr>
              {data.tableTitle.map((fields, index) => (
                <th 
                    key={index} 
                    className={`${index === 0 ? styles.thFirst :styles.th}`}
                >
                    {fields}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.features.map((feature, idx) => (
              <ComparisonRow
                key={feature}
                feature={feature}
                rowIndex={idx}
                plans={plans}
                styles={styles}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ComparisonTable