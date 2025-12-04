import React from 'react'

function Paragraph({ paragraph, paragraphStyle }) {
  return (
    <p className={paragraphStyle}>
        {paragraph}
    </p>
  )
}

export default Paragraph