import React from 'react'
import FormBadge from './FormBadge'
import Title from "@/components/common/Title"

function FormHeader({ badge, heading, description, styles}) {
  return (
    <div className={styles.container}>
        <FormBadge 
          text={badge.text}
          bgColor={badge.bgColor}
          textColor={badge.textColor}
          styles={styles}
        />
        <Title title={heading} titleStyle={styles.title} />
        <p className={styles.description}>
          {description.text}{' '}
          <a 
              href={`mailto:${description.email}`} 
              className={`${description.linkColor} hover:underline`}
          >
              {description.email}
          </a>
        </p>
    </div>
  )
}

export default FormHeader