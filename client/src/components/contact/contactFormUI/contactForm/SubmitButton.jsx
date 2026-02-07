import React from 'react'

function SubmitButton({ text, bgColor, hoverColor, icon, onClick, loading, styles }) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`${styles.button} ${bgColor} ${hoverColor} ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      <span>{loading ? 'Submitting...' : text}</span>
      {!loading && icon}
    </button>
  )
}

export default SubmitButton