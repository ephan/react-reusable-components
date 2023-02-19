import React, { useState } from 'react';
import DatePicker from './DatePicker';
import type {
    Options
} from 'flatpickr/dist/types/options';

const DatePickerExample: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleDateChange = (selectedDates: Date[]) => {
    setSelectedDate(selectedDates[0]);
  };

  const options = {
    enableTime: false,
    mode: 'range',
    dateFormat: 'Y-m-d',
  } satisfies Options;

  return (
    <div className="container mx-auto p-4">
          <DatePicker options={options} onChange={handleDateChange} />
    </div>
  );
};

export default DatePickerExample;
