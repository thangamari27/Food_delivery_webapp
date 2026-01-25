import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useVerifyEmail } from '@/hooks/useVerifyEmail';
import VerificationLoader from './VerificationLoader';
import VerificationSuccess from './VerificationSuccess';
import VerificationError from './VerificationError';

function VerifyEmailSection() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  
  const token = searchParams.get('token');
  
  const { status, message } = useVerifyEmail({
  token,
  updateUser,
  navigate,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            {status === 'verifying' && <VerificationLoader />}
            {status === 'success' && <VerificationSuccess message={message} />}
            {status === 'error' && (
            <VerificationError
            message={message}
            onLogin={() => navigate('/login')}
            />
            )}
        </div>
    </div>
  )
}

export default VerifyEmailSection