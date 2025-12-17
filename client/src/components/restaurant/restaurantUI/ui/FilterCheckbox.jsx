
function FilterCheckbox({ 
  id, 
  value, 
  checked, 
  onChange, 
  children, 
  type = "checkbox",
  styles 
}) {
  const inputClass = type === "checkbox" ? styles.checkboxInput : styles.radioInput;
  
  return (
    <label htmlFor={id} className={styles.checkbox}>
      <input
        id={id}
        type={type}
        value={value}
        checked={checked}
        onChange={onChange}
        className={inputClass}
      />
      {children}
    </label>
  );
}

export default FilterCheckbox;