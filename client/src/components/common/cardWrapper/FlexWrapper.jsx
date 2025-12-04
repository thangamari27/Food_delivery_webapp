import React from 'react'

function FlexWrapper({ children, flexStyle}) {
  return (
    <div className={flexStyle}>
        {children}
    </div>
  )
}

export default FlexWrapper