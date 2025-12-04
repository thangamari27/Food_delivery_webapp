import React from 'react'
import FormBadge from './FormBadge'

function FormHeader({ badge, heading, description}) {
  return (
    <div className="text-center mb-10">
        <FormBadge 
        text={badge.text}
        bgColor={badge.bgColor}
        textColor={badge.textColor}
        />
        <h1 className="text-4xl text-left font-bold py-4">{heading}</h1>
        <p className="max-md:text-sm text-gray-500">
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