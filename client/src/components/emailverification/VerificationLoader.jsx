import React from 'react'

function VerificationLoader() {
  return (
    <>
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Verifying Your Email...</h2>
        <p className="text-gray-600">Please wait a moment</p>
    </>
  )
}

export default VerificationLoader