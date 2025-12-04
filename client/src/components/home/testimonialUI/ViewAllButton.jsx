import React from 'react'
import { testimonialsSection } from '@/utils/constant/user/HomeConstant'

function ViewAllButton() {
  return (
    <div className="text-center m-8">
        <a 
        href={testimonialsSection.viewAllLink}
        className="inline-flex items-center gap-2 bg-gray-200 hover:bg-orange-500 hover:text-amber-50 text-gray-700 px-8 py-3 rounded-full font-medium transition-all duration-300"
        >
        {testimonialsSection.viewAllText}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
        </svg>
        </a>
    </div>
  )
}

export default ViewAllButton