import React from 'react'

function ButtonClick({ text, onClick, buttonStyle }) {
  return (
    <button onClick={onClick} className={buttonStyle}>
      {text}
    </button>
  )
}

export default ButtonClick