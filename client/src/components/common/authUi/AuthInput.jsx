function AuthInput({ 
  name, 
  type, 
  placeholder, 
  value, 
  onChange, 
  error,
  styles,
  disabled = false 
}) {
  return (
    <div className={styles.inputWrapper}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
        aria-label={placeholder}
        disabled={disabled}
      />
      {error && (
        <span className={styles.error}>{error}</span>
      )}
    </div>
  )
}

export default AuthInput