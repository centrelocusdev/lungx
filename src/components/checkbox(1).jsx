import React, { useState, useEffect } from 'react'
import Select from 'react-select'

const options = [
  { value: 'Coarse crackle', label: 'Coarse Crackle' },
  { value: 'Fine crackle', label: 'Fine Crackle' },
  { value: 'Ronchi', label: 'RonChi' },
  { value: 'Wheeze', label: 'Wheeze' },
  { value: 'Normal', label: 'Normal' },
  { value: 'All', label: 'All' },
]

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
  const [selectedOption, setSelectedOption] = useState(null)

//   console.log(JSON.parse(lung_audio.p1_tag),JSON.parse(lung_audio.p1_tag).options,"One")

// let audio_tag 
// const modify = (value)=> {
//   const options = JSON.parse(value).options
// let tagi = ""
// audio_tag = options.map((option,index)=>{
//   if (option.isChecked===true)
//   {
//     tagi += option.position 
//     tagi += (index < options.length - 1) ? ',': ''
    
//      console.log(option,tagi)
//   }
// })
// return tagi 
// }

// console.log(audio_tag,modify(lung_audio.p1_tag))

  useEffect(() => {
    let defaultvalue = value.split(',')
    const Defaultvalue = defaultvalue.map((value, index) => {
      defaultvalue[index] = { value: value, label: value }
    })
    console.log(Defaultvalue, defaultvalue, 'defaultvalue In UseEffect')

    setSelectedOption(defaultvalue)
  }, [value])

//   console.log(Defaultvalue,defaultvalue,"defaultvalue")
  const handleSelectOptions = (selectedOptions) => {
    console.log(selectedOptions, 'itse','p10')
    // console.log(selectedOptions)
    setSelectedOption(selectedOptions)
    // let newValue = ''
//   selectedOptions.forEach((element) => {
      
//       newValue = newValue +  element.value + ','
//       console.log(element,newValue)
      
// })

let newValue = selectedOptions.map((obj) => obj.value).join(',')
let e = {target: {name:name1,value:newValue}}
console.log(newValue,"value",e)
    //  target = {name:name,value:newValue} 

    onChange(e)
  }

//   const handleSelectOptions = (e) => {
//     console.log(e, e.value,'itse')
//     // console.log(selectedOptions)
//     // setSelectedOption(selectedOptions)


//   }
  console.log(selectedOption, 'In CheckBox')
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
  )
}
