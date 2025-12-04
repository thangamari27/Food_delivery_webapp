import React from 'react'

function TextareaField({ id, label, placeholder, requiredField,required, rows = 4, value, onChange }) {
  return (
     <div className="mb-4">
      <label htmlFor={id} className="font-medium block mb-2">{label}{required && <span className="ml-2 text-xs text-red-500">{requiredField}</span>}</label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        className="w-full p-3 bg-transparent border border-slate-300 rounded-lg resize-none outline-none"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default TextareaField