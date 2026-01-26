import { useState, useEffect } from 'react';

export function useCountdown(initialSeconds = 0) {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
    if (seconds <= 0) return;

    const timer = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(timer);
    }, [seconds]);

    return {
    seconds,
    start: (value) => setSeconds(value),
    isActive: seconds > 0,
    };
}