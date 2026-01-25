import React from 'react'

function ResendEmailButton({ onClick, loading, countdown }) {
  return (
    <button
        onClick={onClick}
        disabled={loading || countdown > 0}
        className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:bg-gray-300"
        >
        {loading
        ? 'Sending...'
        : countdown > 0
        ? `Resend in ${countdown}s`
        : 'Resend Verification Email'}
    </button>
  )
}

export default ResendEmailButton