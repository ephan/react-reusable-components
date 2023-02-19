import React, { useState } from 'react';
import Dropdown from './Dropdown';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const DropdownExample: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectOption = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Dropdown
        options={options}
        selectedOption={selectedOption}
        onSelectOption={handleSelectOption}
      />
      <p className="mt-4">
        You selected: {selectedOption ? selectedOption.label : 'none'}
      </p>
    </div>
  );
};

export default DropdownExample;
