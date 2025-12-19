
function AuthButton({ 
  children, 
  type = "button", 
  variant = "primary", 
  onClick, 
  disabled,
  styles 
}) {
  const buttonClass = variant === "primary" 
    ? styles?.primary 
    : styles?.social;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  )
}

export default AuthButton