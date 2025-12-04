import React from 'react'

function FormBadge({text, bgColor, textColor, styles }) {
  return (
    <p className={`${bgColor} ${textColor} ${styles.badge}`}>
        {text}
    </p>
  )
}

export default FormBadge