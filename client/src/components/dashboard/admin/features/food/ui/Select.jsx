import React from 'react'

function Select({ label, error, required, children, className = '', styles, ...props }) {
  return (
    <div className={className}>
    {label && (
      <label className={styles.form.label}>
        {label} {required && <span className={styles.form.required}>*</span>}
      </label>
    )}
    <select 
      className={`${styles.inputs.base} ${error ? styles.inputs.error : styles.inputs.normal}`} 
      {...props}
    >
      {children}
    </select>
    {error && <p className={styles.form.error}>{error}</p>}
  </div>
  )
}

export default Select