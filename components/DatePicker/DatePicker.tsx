import React, { useEffect, useRef } from 'react';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import type {
    Options
} from 'flatpickr/dist/types/options';

export type DatePickerInstance = Flatpickr.Instance;

interface Props {
  options?: Options;
  onChange?: (selectedDates: Date[], dateStr: string) => void;
}

const DatePicker: React.FC<Props> = ({ options, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) {
        return;
    }
    const instance : DatePickerInstance =  Flatpickr(inputRef.current, {
      ...options,
      onChange: onChange,
    });
    return () => {
      instance.destroy();
    };
  }, [options, onChange]);
  

  return (
    <input
      type="text"
      className="bg-white border rounded px-3 py-2 outline-none focus:border-blue-500"
      ref={inputRef}
    />
  );
};

export default DatePicker;
