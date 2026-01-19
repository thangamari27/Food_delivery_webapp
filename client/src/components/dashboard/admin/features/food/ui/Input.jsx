import React from 'react'

function Input({ label, error, required, className = '', styles, ...props }) {
  return (
    <div className={className}>
    {label && (
      <label className={styles.form.label}>
        {label} {required && <span className={styles.form.required}>*</span>}
      </label>
    )}
    <input 
      className={`${styles.inputs.base} ${error ? styles.inputs.error : styles.inputs.normal}`} 
      {...props} 
    />
    {error && <p className={styles.form.error}>{error}</p>}
  </div>
  )
}

export default Input