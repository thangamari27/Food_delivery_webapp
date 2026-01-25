import React from 'react'

function VerificationTips({ email }) {
  return (
    <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
        <li>Check spam/junk folder</li>
        <li>Confirm {email} is correct</li>
        <li>Try resending the email</li>
    </ul>
  )
}

export default VerificationTips