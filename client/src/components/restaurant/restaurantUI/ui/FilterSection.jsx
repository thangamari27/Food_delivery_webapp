

function FilterSection({ 
  title, 
  icon: Icon, 
  children,
  styles 
}) {
  return (
    <div className={styles.filterSection}>
      <h3 className={styles.filterTitle}>
        {Icon && <Icon className="w-4 h-4" />}
        {title}
      </h3>
      <div className={styles.filterOptions}>
        {children}
      </div>
    </div>
  );
}

export default FilterSection;