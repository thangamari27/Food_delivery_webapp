import React from 'react'

function FormBadge({text, bgColor, textColor}) {
  return (
    <p className={`text w-32 ${bgColor} ${textColor} font-medium px-1 py-2 rounded-full`}>
        {text}
    </p>
  )
}

export default FormBadge