import React from 'react'
import { Search } from 'lucide-react'

function NotFound({ heading, message, icon, iconSize, styles }) {
  return (
    <div className="col-span-full py-16 text-center bg-gray-50 rounded-xl m-4 border border-dashed border-gray-300">
        <Search size={48} className="mx-auto text-gray-400 mb-4" />
    <h3 className="text-xl font-semibold text-gray-600">{heading}</h3>
    <p className="text-gray-500">{message}</p>
  </div>
  )
}

export default NotFound