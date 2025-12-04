import React from 'react'

function Title({ title, titleStyle, highlightedText, highlightedTextStyle }) {
  return (
    <h1 className={titleStyle}>
        {title}
        {highlightedText &&
            <span className={highlightedTextStyle}>{highlightedText}</span>
        }
    </h1>
  )
}

export default Title