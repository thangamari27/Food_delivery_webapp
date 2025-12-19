import React from 'react'

function AuthDivider({ text = "or", styles }) {
  return (
    <div className={styles.container}>
      <div className={styles.line}></div>
      <span className={styles.text}>{text}</span>
      <div className={styles.line}></div>
    </div>
  )
}

export default AuthDivider