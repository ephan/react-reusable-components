import { useState } from 'react';
import Autocomplete from './Autocomplete';


const primaryData = [
    'Apple',
    'Apricot',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Cherry',
    'Coconut',
    'Cranberry',
    'Grapefruit',
    'Kiwi',
  ];
  
  const secondaryData = [
    'Artichoke',
    'Asparagus',
    'Beet',
    'Broccoli',
    'Brussel Sprouts',
    'Cabbage',
    'Carrot',
    'Cauliflower',
    'Celery',
    'Cucumber',
  ];


const AutocompleteExample = () => {
  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<string[]>([...primaryData , ...secondaryData]);


  

  const handleInputChange = (inputValue: string) => {
    const primaryMatches = primaryData.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    const secondaryMatches = secondaryData.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setOptions([...primaryMatches, ...secondaryMatches]);
    setValue(inputValue);
  };

  const handleOptionSelect = (selectedOption: string) => {
    setValue(selectedOption);
  };

  type AutocompleteProps<T> = {
    options: T[];
    onOptionSelect: (option: T) => void;
    getOptionPrimaryData: (option: T) => string;
    getOptionSecondaryData: (option: T) => string;
  };
  

  return (
    <div>
      <Autocomplete
        options={options}
        onOptionSelect={handleOptionSelect}
        getOptionPrimaryData={(input: string) => primaryData.find((option) => option === input) || ""}
        getOptionSecondaryData={(input: string) => secondaryData.find((option) => option === input) || ""}
      />
    </div>
  );
};

export default AutocompleteExample;
