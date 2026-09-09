import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = ({ initialSeconds = 0, isCountdown = false, onExpire } = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (isCountdown) {
            if (prev <= 1) {
              clearInterval(intervalRef.current);
              setIsActive(false);
              if (onExpire) onExpire();
              return 0;
            }
            return prev - 1;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isCountdown, onExpire]);

  const pause = useCallback(() => setIsActive(false), []);
  const resume = useCallback(() => setIsActive(true), []);
  const reset = useCallback((newSeconds = initialSeconds) => {
    setSeconds(newSeconds);
    setIsActive(true);
  }, [initialSeconds]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    seconds,
    formattedTime: formatTime(seconds),
    isActive,
    pause,
    resume,
    reset,
  };
};
