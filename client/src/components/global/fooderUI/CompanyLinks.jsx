import React from 'react'

function CompanyLinks({ company }) {
  return (
    <div>
        <h4 className="text-lg font-bold text-gray-900 mb-4">
            {company.title}
        </h4>
        <ul className="space-y-3">
            {company.links.map((link, index) => (
            <li key={index}>
                <a 
                href={link.path}
                className="text-gray-600 hover:text-orange-500 transition-colors text-sm"
                >
                {link.name}
                </a>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default CompanyLinks