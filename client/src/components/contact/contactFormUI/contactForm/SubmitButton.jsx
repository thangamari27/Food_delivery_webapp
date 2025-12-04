import React from 'react'

function SubmitButton({ text, bgColor, hoverColor, icon, onClick, styles }) {
  return (
    <button
        onClick={onClick}
        className={`${styles.button} ${bgColor} ${hoverColor}`}
      >
        <span>{text}</span>
        {icon}
    </button>
  )
}

export default SubmitButton