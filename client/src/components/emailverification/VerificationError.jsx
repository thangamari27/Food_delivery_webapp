import { X } from "lucide-react"

function VerificationError({ message, onLogin }) {
  return (
    <>
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <X className="w-5 h-5 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
        onClick={onLogin}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
        Go to Login
        </button>
    </>
  )
}

export default VerificationError