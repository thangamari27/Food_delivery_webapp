import React from 'react'

function EnquiryHeader({ content, styles }) {
  return (
    <div className={styles.header_section}>
      <div className={styles.header_wrapper}>
        <div>
          <h1 className={styles.header_title}>
            {content.header.title}
          </h1>
          <p className={styles.header_subtitle}>
            {content.header.subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EnquiryHeader