import { Check } from "lucide-react"

function VerificationSuccess({ message }) {
  return (
    <>
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-5 h-5 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
    </>
  )
}

export default VerificationSuccess