import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  {
    label: 'Group 1',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
  {
    label: 'Group 2',
    options: [
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' },
    ],
  },
];

function MySelect() {
  const [selectedOption, setSelectedOption] = useState(null);

  function handleLabel (label) {

// console.log(label)
  }

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    //  console.log(selectedOption)
    // Check if the selected option is a group heading
    if (selectedOption && selectedOption.label && !selectedOption.value) {
      // console.log('Selected Group Heading:', selectedOption.label);
    } else {
      // console.log('Selected Option:', selectedOption);
    }
  };

  return (
    <Select
       isMulti
       hasValue
       getOptionLabel={handleLabel}
       label
      options={options}
      onChange={handleChange}
      value={selectedOption}
    />
  );
}

export default MySelect;
