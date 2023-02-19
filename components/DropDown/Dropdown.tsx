import React, { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  selectedOption?: Option;
  onSelectOption: (option: Option) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelectOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (option: Option) => {
    onSelectOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border rounded-md py-2 px-3 cursor-pointer flex items-center justify-between"
      >
        {selectedOption ? (
          <div className="text-gray-700">{selectedOption.label}</div>
        ) : (
          <div className="text-gray-500">Select an option</div>
        )}
        <svg
          className="h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 14l-6-6h12l-6 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelectOption(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
