
function Badge({ children, badgeStyle = ""}) {
  return (
    <span className={badgeStyle}>
        {children}
    </span>
  )
}

export default Badge