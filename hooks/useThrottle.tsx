import { useState, useEffect } from "react";

function useThrottle <T>(value: T, delay: number) : T {
  const [throttledValue, setThrottledValue] = useState(value);
  const [lastValue, setLastValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setThrottledValue(lastValue);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay, lastValue]);

  useEffect(() => {
    setLastValue(value);
  }, [value]);

  return throttledValue;
};

export default useThrottle;
