import { useState, useEffect } from 'react';
import { calculateTimeLeft } from '@/components/common/activeOffer/ActiveOfferUI/calculateTimeLeft ';

export default function useCountdown(endDate, interval = 1000) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate));
  const [animatingUnit, setAnimatingUnit] = useState(null);

  useEffect(() => {
    // immediate sync
    setTimeLeft(calculateTimeLeft(endDate));

    const timer = setInterval(() => {
      const next = calculateTimeLeft(endDate);

      if (next.seconds !== timeLeft.seconds) setAnimatingUnit('seconds');
      if (next.minutes !== timeLeft.minutes) setAnimatingUnit('minutes');
      if (next.hours !== timeLeft.hours) setAnimatingUnit('hours');
      if (next.days !== timeLeft.days) setAnimatingUnit('days');

      setTimeLeft(next);
      setTimeout(() => setAnimatingUnit(null), 300);
    }, interval);

    return () => clearInterval(timer);
    
  }, [endDate, interval, timeLeft.seconds, timeLeft.minutes, timeLeft.hours, timeLeft.days]);

  return { timeLeft, animatingUnit };
}
