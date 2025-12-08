import React from 'react'

function TopCategoriesContainer({ children, styles }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {children}
      </div>
    </section>
  )
}

export default TopCategoriesContainer