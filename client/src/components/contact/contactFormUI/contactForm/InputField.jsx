import React from 'react'

function InputField({ id, label, type = 'text', placeholder, requiredField,required, icon, value, onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="font-medium block mb-2">{label}{required && <span className="ml-2 text-xs text-red-500">{requiredField}</span>}</label>
      <div className="flex items-center h-10 pl-3 border border-slate-300 rounded-md overflow-hidden">
        {icon && <div className="flex-shrink-0 mr-2">{icon}</div>}
        <input
          id={id}
          name={id}
          type={type}
          className="h-full px-2 w-full outline-none bg-transparent"
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default InputField