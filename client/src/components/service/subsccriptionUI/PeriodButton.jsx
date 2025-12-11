

function PeriodButton({ periods, active, onChange, styles}) {
  return (
    <div className={styles.periodToggle}>
        {periods.map((period, index) => (
            <button 
                key={index}
                onClick={() => onChange(period)}
                className={`${styles.periodBtn}
                ${active === period ? styles.periodBtnActive : styles.periodBtnInactive}
                `}
            >
                {period}
            </button>
        ))}
    </div>
  )
}

export default PeriodButton