import IconComponent from '@/components/common/IconComponent'

function IconButton({ icon, onClick, badge, ariaLabel, className='',styles }) {
  return (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className={`${styles.btn} ${className}`}
    >
        <IconComponent Icon={icon} className={styles.icon} />
        {badge > 0 && (
        <span className={styles.badge}>
            {badge > 99 ? '99+' : badge}
        </span>
        )}
    </button>
  )
}

export default IconButton