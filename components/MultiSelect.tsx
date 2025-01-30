import React from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';

// Define the type for a single option in the select list
interface OptionType {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: OptionType[];
  selectedOptions: MultiValue<OptionType>;
  onChange: (selected: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedOptions, onChange }) => {
  return (
    <Select
      isMulti
      value={selectedOptions}
      onChange={onChange}
      options={options}
      className="w-full"
      classNamePrefix="react-select"
    />
  );
};

export default MultiSelect;



