import React from 'react'

function AuthFooter({ text, linkText, onLinkClick, styles }) {
  return (
    <div className={styles.container}>
        {text}{' '}
        <button
            type="button"
            onClick={onLinkClick}
            className={styles.link}
        >
            {linkText}
        </button>
    </div>
  )
}

export default AuthFooter