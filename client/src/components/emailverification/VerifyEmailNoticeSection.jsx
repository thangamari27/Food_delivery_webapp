import { useAuth } from '../../hooks/useAuth'
import { useCountdown } from '../../hooks/useEmailCountdown';
import { useEmailVerification } from '../../hooks/useEmailVerification';
import { useNavigate } from 'react-router-dom';
import EmailNoticeCard from './EmailNoticeCard';
import ResendEmailButton from './ResendEmailButton';
import VerificationTips from './VerificationTips';

function VerifyEmailNoticeSection() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { seconds, start, isActive } = useCountdown();
  const { resendEmail, checkVerification } =
  useEmailVerification(updateUser, navigate);

  useEffect(() => {
    if (user?.email_verified) navigate('/user');
  }, [user]);
  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <EmailNoticeCard email={user?.email} />
        <ResendEmailButton
        onClick={() => resendEmail(start)}
        loading={false}
        countdown={seconds}
        />
        <button
        onClick={checkVerification}
        className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg"
        >
        I've Verified – Continue
        </button>
        <VerificationTips email={user?.email} />
        </div>
    </div>
  )
}

export default VerifyEmailNoticeSection