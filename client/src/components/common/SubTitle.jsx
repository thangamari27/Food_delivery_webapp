import React from 'react'

function SubTitle({ subTitle, subTitleStyle }) {
  return (
    <h3 className={subTitleStyle}>
        {subTitle}
    </h3>
  )
}

export default SubTitle