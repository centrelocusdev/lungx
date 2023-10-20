import React, { useState, useEffect } from "react";
import Select from "react-select";

// const options = [
//   { value: 'Coarse crackle', label: 'Coarse Crackle' },
//   { value: 'Fine crackle', label: 'Fine Crackle' },
//   { value: 'Ronchi', label: 'RonChi' },
//   { value: 'Wheeze', label: 'Wheeze' },
//   { value: 'Normal', label: 'Normal' },
//   { value: 'All', label: 'All' },
// ]
const options = [
  {
    value: JSON.stringify({
      id: 1,
      position: "Coarse crackle",
      isChecked: true,
    }),
    label: "Coarse crackle",
  },
  {
    value: JSON.stringify({ id: 2, position: "Fine crackle", isChecked: true }),
    label: "Fine crackle",
  },
  {
    value: JSON.stringify({ id: 3, position: "Ronchi", isChecked: true }),
    label: "Ronchi",
  },
  {
    value: JSON.stringify({ id: 4, position: "Wheeze", isChecked: true }),
    label: "Wheeze",
  },
  {
    value: JSON.stringify({ id: 5, position: "Normal", isChecked: true }),
    label: "Normal",
  },
  {
    value: JSON.stringify({ id: 6, position: "All", isChecked: true }),
    label: "All",
  },
];

// jugaad
const allValue = JSON.stringify([
  { id: 1, position: "Coarse crackle", isChecked: true },
  { id: 2, position: "Fine crackle", isChecked: true },
  { id: 3, position: "Ronchi", isChecked: true },
  { id: 4, position: "Wheeze", isChecked: true },
  { id: 5, position: "Normal", isChecked: true },
  { id: 6, position: "All", isChecked: true },
]);

// const options = [
//   {
//     label: "group 1",
//     options: [
//       {
//         label: ">>> nested group 1",
//         options: [
//           {
//             label: "nested 1",
//             value: 1
//           },
//           {
//             label: "nested 2",
//             value: 2
//           }
//         ]
//       },
//       {
//         label: ">>> nested group 2",
//         options: [
//           {
//             label: "nested 1",
//             value: 3
//           }
//         ]
//       },
//       {
//         label: ">>> nested group 3",
//         options: [
//           {
//             label: ">>> >>> nested group 3b",
//             value: 4,
//             options: [
//               {
//                 label: "nested 1",
//                 value: 5
//               },
//               {
//                 label: "nested 2",
//                 value: 6
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   },
//   {
//     label: "group 2",
//     options: [
//       {
//         label: ">>> nested group 1",
//         options: [
//           {
//             label: "nested 1",
//             value: 7
//           },
//           {
//             label: "nested 2",
//             value: 8
//           },
//           {
//             label: "nested 3",
//             value: 9
//           },
//           {
//             label: "nested 4",
//             value: 10
//           },
//           {
//             label: "nested 5",
//             value: 11
//           }
//         ]
//       }
//     ]
//   }
// ];
export default function App({ value, name1, onChange }) {
  const [selectedOption, setSelectedOption] = useState(null);

  //   console.log(JSON.parse(lung_audio.p1_tag),JSON.parse(lung_audio.p1_tag).options,"One")

  // console.log(value,typeof(value), JSON.parse(value),name1,"onchange")

  let audio_tag;
  const modify = (value1) => {
    // console.log(value1,'inmodify')
    const value = value1.replaceAll("\\", "");
    const options = JSON.parse(value).options;
    let tagi = "";
    audio_tag = options.map((option, index) => {
      if (option.isChecked === true) {
        tagi += option.position;
        tagi += index < options.length - 1 ? "," : "";

        //  console.log(option,tagi)
      }
    });
    return tagi;
  };

  console.log(value, modify(value), typeof (audio_tag, modify(value)), "modi");

  useEffect(() => {
    // let defaultvalue = modify(value).split(',')
    let defaultvalue = JSON.parse(value).options;
    const Defaultvalue = defaultvalue.map((value, index) => {
      const { position } = value;
      defaultvalue[index] = { value: JSON.stringify(value), label: position };
    });
    console.log(Defaultvalue, defaultvalue, value, "defaultvalue In UseEffect");

    setSelectedOption(defaultvalue);
  }, [value]);

  //   console.log(Defaultvalue,defaultvalue,"defaultvalue")

  const handleSelectOptions = (selectedOptions) => {
    console.log(selectedOptions, "itse");
    // console.log(selectedOptions)
    setSelectedOption(selectedOptions);
    // let newValue = ''
    //   selectedOptions.forEach((element) => {

    //       newValue = newValue +  element.value + ','
    //       console.log(element,newValue)

    // })

    console.log(selectedOptions, "selectedOptions");

    let flag = false;
    let posOfIsAllChosen;
    const isAllChosen = selectedOptions.map((obj, index) => {
      if (obj.label === "All") {
        posOfIsAllChosen = index;
        flag = true;
        return JSON.parse(allValue);
      }
    });

    console.log(isAllChosen, "isAllChosen");
    let newValue = selectedOptions.map((obj) => JSON.parse(obj.value));

    const { id, position, optionid } = JSON.parse(value);
    let e = {
      target: {
        name: name1,
        value: JSON.stringify({
          id,
          position,
          optionid,
          options: flag ? isAllChosen[posOfIsAllChosen] : newValue,
        }),
      },
    };
    console.log(newValue, "newvalue", e);
    console.log(JSON.stringify(newValue, null, 2));
    console.log(value, "value", id, position, optionid);
    //  target = {name:name,value:newValue}

    onChange(e);
  };

  //   const handleSelectOptions = (e) => {
  //     console.log(e, e.value,'itse')
  //     // console.log(selectedOptions)
  //     // setSelectedOption(selectedOptions)

  //   }
  console.log(selectedOption, "In CheckBox");
  return (
    <div className="App">
      <Select
        value={selectedOption}
        isMulti
        name={name1}
        // onChange={setSelectedOption((e) => e.target.value)}
        onChange={handleSelectOptions}
        options={options}
        className={` mt-1 `}
        // className={`w-full bg-[#D1D1D147] rounded px-4 py-2 mt- focus:outline-none focus:bg-white focus:border-[#D1D1D147] border border-transparent`}
      />
    </div>
  );
}
