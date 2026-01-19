import React from 'react'

function Button({ variant = 'primary', children, className = '', styles, ...props}) {
  return (
    <button 
        className={`${styles.buttons[variant]} ${className}`} 
        {...props}
    >
    {children}
  </button>
  )
}

export default Button