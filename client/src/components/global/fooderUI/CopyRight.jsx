import React from 'react'

function CopyRight({ copyright }) {
  return (
    <div className="border-t border-gray-300 pt-8">
        <p className="text-center text-gray-600 text-sm">
          {copyright}
        </p>
    </div>
  )
}

export default CopyRight