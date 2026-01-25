import { useEffect, useState } from 'react';
import { authService } from '@/services/authService';


export function useVerifyEmail({ token, updateUser, navigate }) {
    const [status, setStatus] = useState('verifying');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
    }
    verify(token);
    }, [token]);

    const verify = async (token) => {
    try {
        const res = await authService.verifyEmail(token);

        setStatus('success');
        setMessage(res.data.message);

        const profile = await authService.getProfile();
        updateUser(profile.data.data);

    setTimeout(() => {
        navigate('/user');
    }, 3000);

    } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed');
    }
    };

    return { status, message };
}