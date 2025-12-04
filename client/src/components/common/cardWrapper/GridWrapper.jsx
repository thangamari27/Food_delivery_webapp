import React from "react"

function GridWrapper({ children, gridStyle}) {
  return (
    <div className={gridStyle}>
      {children}
    </div>
  )
}

export default GridWrapper