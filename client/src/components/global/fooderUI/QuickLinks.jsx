import React from 'react'

function QuickLinks({ quick }) {
  return (
    <div>
        <h4 className="text-lg font-bold text-gray-900 mb-4">
            {quick.title}
        </h4>
        <ul className="space-y-3">
            {quick.links.map((link, index) => (
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

export default QuickLinks