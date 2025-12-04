import React from 'react'

function SubmitButton({ text, bgColor, hoverColor, icon, onClick }) {
  return (
    <button
        onClick={onClick}
        className={`flex items-center justify-center gap-2 ${bgColor} ${hoverColor} text-white py-2.5 w-full rounded-full transition-colors`}
      >
        <span>{text}</span>
        {icon}
    </button>
  )
}

export default SubmitButton