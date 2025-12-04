import React from 'react'

function ContactInfo({ contact }) {
  return (
    <div>
        <h4 className="text-lg font-bold text-gray-900 mb-4">
            {contact.title}
        </h4>
        <ul className="space-y-3">
            <li className="text-gray-600 text-sm">
              <a href={'tel:'+contact.phone} >
                {contact.phone}
              </a>
            </li>
            <li className="text-gray-600 text-sm">
              <a href={'mailto:'+contact.email} >
                {contact.email}
              </a>
            </li>
        </ul>
    </div>
  )
}

export default ContactInfo