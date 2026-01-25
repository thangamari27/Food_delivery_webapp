import { authService } from '../services/authService';
import { toast } from 'react-hot-toast';


export function useEmailVerification(updateUser, navigate) {
const resendEmail = async (startCountdown) => {
try {
await authService.resendVerification();
toast.success('Verification email sent!');
startCountdown(60);
} catch (err) {
toast.error(err.response?.data?.message || 'Failed to resend email');
}
};


const checkVerification = async () => {
try {
const res = await authService.getProfile();
if (res.data.data.email_verified) {
updateUser(res.data.data);
toast.success('Email verified!');
navigate('/user');
} else {
toast.info('Email not verified yet');
}
} catch {
toast.error('Failed to check verification status');
}
};


return { resendEmail, checkVerification };
}