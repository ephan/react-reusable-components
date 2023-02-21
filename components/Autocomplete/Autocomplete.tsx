import React, { useState } from "react";

type AutocompleteProps<T> = {
  options: T[];
  onOptionSelect: (option: T) => void;
  getOptionPrimaryData: (option: T) => string;
  getOptionSecondaryData: (option: T) => string;
};

function Autocomplete<T>({
  options,
  onOptionSelect,
  getOptionPrimaryData,
  getOptionSecondaryData,
}: AutocompleteProps<T>) {
  const [inputValue, setInputValue] = useState("");
  const [matchingOptions, setMatchingOptions] = useState<T[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    const inputValueLowerCase = event.target.value.toLowerCase();
    const matchingOptions = options?.filter(
      (option) =>
        getOptionPrimaryData(option).toLowerCase().includes(inputValueLowerCase) ||
        getOptionSecondaryData(option).toLowerCase().includes(inputValueLowerCase)
    );
    setMatchingOptions(matchingOptions);
  };

  const handleOptionSelect = (option: T) => {
    setInputValue(getOptionPrimaryData(option));
    onOptionSelect(option);
  };

  console.log(options);

  return (
    <div className="relative">
      <input
        className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="text"
        value={inputValue}
        placeholder="Search..."
        onChange={handleInputChange}
      />
      {inputValue && (
        <ul className="absolute z-10 w-full py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {matchingOptions?.map((option, index) => (
            <li
              key={index}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionSelect(option)}
            >
              <div className="font-medium text-gray-900">
                {getOptionPrimaryData(option)}
              </div>
              <div className="text-gray-500">{getOptionSecondaryData(option)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
