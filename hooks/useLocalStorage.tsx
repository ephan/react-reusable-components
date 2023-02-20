/**
 * @file useLocalStorage.tsx
 * @description Custom hook to use localStorage.
 * 
 * 
import React from 'react';
import useLocalStorage from './useLocalStorage';

export const App: React.FC = () => {
  const [count, setCount] = useLocalStorage<number>('count', 0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};
 */

import { useState, useEffect } from 'react';

type UseLocalStorage<T> = [T | undefined, (value: T) => void];

function useLocalStorage<T>(key: string, initialValue?: T): UseLocalStorage<T> {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const serializedValue = JSON.stringify(storedValue);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  const setValue = (value: T) => {
    setStoredValue(value);
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
