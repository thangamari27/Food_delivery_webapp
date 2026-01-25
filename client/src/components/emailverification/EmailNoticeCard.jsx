import React from 'react'

function EmailNoticeCard({ email }) {
  return (
    <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Verify Your Email</h2>
        <p className="text-gray-600">We've sent a link to</p>
        <p className="font-semibold">{email}</p>
    </div>
  )
}

export default EmailNoticeCard