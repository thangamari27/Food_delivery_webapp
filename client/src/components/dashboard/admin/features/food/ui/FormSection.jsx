import React from 'react'

function FormSection({ title, children, styles }) {
  return (
    <div className={styles.form.section}>
        <h3 className={styles.form.sectionTitle}>{title}</h3>
        {children}
    </div>
  )
}

export default FormSection