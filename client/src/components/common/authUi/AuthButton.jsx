function AuthButton({ 
  children, 
  type = "button", 
  variant = "primary", 
  onClick, 
  disabled,
  styles,
  isLoading = false
}) {
  const buttonClass = variant === "primary" 
    ? styles?.primary 
    : styles?.social;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${buttonClass} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  )
}

export default AuthButton