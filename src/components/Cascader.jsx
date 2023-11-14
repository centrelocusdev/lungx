import React,{useState} from 'react';
import { Cascader } from 'antd';

// Can't use this since, The Deep Copy of  Nested Json Structure can't be made ticks in defaultJsonFormat refers to same ticks 
// const ticks = [
//     [{"id":1,"title":"< 1 Year","isChecked":false},
//     {"id":2,"title":"< 5 Years","isChecked":false},
//     {"id":3,"title":"< 10 Years","isChecked":false},
//     {"id":4,"title":"> 10 Years","isChecked":false}]
// ]

// const defaultJsonFormat = [
//     {"id":1,"title":"Asthma","isChecked":false,"optionid":2,"options":ticks},
//     {"id":2,"title":"Hypertension","isChecked":false,"optionid":2,"options":ticks},
//     {"id":3,"title":"Diabetes","isChecked":false,"optionid":2,"options":ticks},
//     {"id":4,"title":"Heart Disease","isChecked":false,"optionid":2,"options":ticks},
// ]

// Default Structure of Json Format of particular tag 
// const defaultJsonFormat = [
//     {"id":1,"title":"Asthma","isChecked":false,"optionid":2,
//     "options":[{"id":1,"title":"< 1 Year","isChecked":false},
//     {"id":2,"title":"< 5 Years","isChecked":false},
//     {"id":3,"title":"< 10 Years","isChecked":false},
//     {"id":4,"title":"> 10 Years","isChecked":false}]
// },

//     {"id":2,"title":"Hypertension","isChecked":false,"optionid":2,
//     "options":[{"id":1,"title":"< 1 Year","isChecked":false},
//     {"id":2,"title":"< 5 Years","isChecked":false},
//     {"id":3,"title":"< 10 Years","isChecked":false},
//     {"id":4,"title":"> 10 Years","isChecked":false}]
// },
//     {"id":3,"title":"Diabetes","isChecked":false,"optionid":2,
//     "options":[{"id":1,"title":"< 1 Year","isChecked":false},
//     {"id":2,"title":"< 5 Years","isChecked":false},
//     {"id":3,"title":"< 10 Years","isChecked":false},
//     {"id":4,"title":"> 10 Years","isChecked":false}]
// },
//     {"id":4,"title":"Heart Disease","isChecked":false,"optionid":2,
//     "options":[{"id":1,"title":"< 1 Year","isChecked":false},
//     {"id":2,"title":"< 5 Years","isChecked":false},
//     {"id":3,"title":"< 10 Years","isChecked":false},
//     {"id":4,"title":"> 10 Years","isChecked":false}]},
// ]

// cascader options and their values 
// In this project, we are  converting the  isChecked to cascderoptions and on changing values(handlechange), we are using defaultoptions 
// and [ischecked = true mapping with  selected options ] converting it into json structure to send to databse   
// const cascaderOptions = [
//     {  
//         label:'Asthma',
//         value:'Asthma',
//         disableCheckbox: true,
//         children:[
//             {label:'< 1 Year',
//                 value:'< 1 Year', },
//             {label:'< 5 Years',
//                 value:'< 5 Years', },
//             {label:'< 10 Years',
//                 value:'< 10 Years', },
//             {label:'> 10 Years',
//                 value:'> 10 Years', },
//         ]
//     },
//     {
//         label:'Hypertension',
//         value:'Hypertension',
//         disableCheckbox: true,
//         children:[
//             {label:'< 1 Year',
//                 value:'< 1 Year', },
//             {label:'< 5 Years',
//                 value:'< 5 Years', },
//             {label:'< 10 Years',
//                 value:'< 10 Years', },
//             {label:'> 10 Years',
//                 value:'> 10 Years', },
//         ]
//     },
//     {
//         label:'Diabetes',
//         value:'Diabetes',
//         disableCheckbox: true,
//         children:[
//             {label:'< 1 Year',
//                 value:'< 1 Year', },
//             {label:'< 5 Years',
//                 value:'< 5 Years', },
//             {label:'< 10 Years',
//                 value:'< 10 Years', },
//             {label:'> 10 Years',
//                 value:'> 10 Years', },
//         ]
//     },
//     {
//         label:'Heart Disease',
//         value:'Heart Disease',
//         disableCheckbox: true,
//         children:[
//             {label:'< 1 Year',
//                 value:'< 1 Year', },
//             {label:'< 5 Years',
//                 value:'< 5 Years', },
//             {label:'< 10 Years',
//                 value:'< 10 Years', },
//             {label:'> 10 Years',
//                 value:'> 10 Years', },
//         ]
//     },

// ]

// For Testcases
// const options = [
//   {
//     label: 'Light',
//     value: 'light',
//     children: new Array(20).fill(null).map((_, index) => ({
//       label: `Number ${index}`,
//       value: index,
//     })),
//   },
//   {
//     label: 'Bamboo',
//     value: 'bamboo',
//     children: [
//       {
//         label: 'Little',
//         value: 'little',
//         children: [
//           {
//             label: 'Toy Fish',
//             value: 'fish',
//             disableCheckbox: true,
//           },
//           {
//             label: 'Toy Cards',
//             value: 'cards',
//           },
//           {
//             label: 'Toy Bird',
//             value: 'bird',
//           },
//         ],
//       },
//     ],
//   },
// ];
const App = ({value1,name1,onChange, cascaderOptions,defaultJsonFormat , is_disabled}) => {


    // cascader value is in form [[firstlevelValue, SecondLevelValue],[firstlevelValue, SecondlevelValue]]
    // get cascder values from the received data
    let defaultValue = [] 
    const newValue = JSON.parse(value1)
    const loop = newValue.map((item)=>{
        let temp = []
         if (item.isChecked===true)
         {     temp.push(item.title)
            let option =  item.options.find((option)=> option.isChecked === true)
            temp.push(option.title)
            // console.log(item)
         }
         // to make sure that both asthma and its option is checked
         temp.length === 2 ? defaultValue.push(temp): ''
    }
    )
    // console.log(defaultValue,"defaultValue")
    

    // console.log(value1,name1,onChange,"In Cascader",newValue)
    // const [value,setValue ] = useState(['Asthma', '< 5 Years'])
    const [value,setValue ] = useState(defaultValue)
    

    // HandleChange 
    let newJsonFormat = defaultJsonFormat
    const handleChange = (selectedOptions) => {
        setValue(selectedOptions)
        // comment setValue and cgheck later, because default value will change there is no need of set value 
        
        // console.log(selectedOptions,newValue,"In hablechange value ");

     // map selected Values with the Json Format
     selectedOptions.map((item)=>{
        // console.log(item)
        newJsonFormat = newJsonFormat.map((particularDisease)=>{
            if(particularDisease.title === item[0])
            {
                let resultOptions = particularDisease.options.map((year)=>{
                    // console.log(year,year.title,'year')
                    if(year.title===item[1]){
                        // console.log('i reached here')
                       return { ...year,isChecked:true}
                    }
                    return {...year}
                         })
                // console.log(item,particularDisease, resultOptions, " complex issue")
                return {...particularDisease,isChecked:true,
                options: resultOptions}
            
           }
        return {...particularDisease}
        
        })
        // console.log(newJsonFormat,"newJsonFormat")

      })
      let e = {target: {name:name1,value:JSON.stringify(newJsonFormat)}}
      onChange(e)

    };

    const dummy = (value) => {
      // console.log(value);
    };

   if(is_disabled){
    return (

      <Cascader
        style={{
          width: '100%',
        }}
        options={cascaderOptions}
        // onChange={handleChange}
        multiple
        value={value}
        onDropdownVisibleChange={dummy}
        maxTagCount="responsive"
        // disabled
        
      />
    );
   }else {
    return(
      
      <Cascader
        style={{
          width: '100%',
        }}
        options={cascaderOptions}
        onChange={handleChange}
        multiple
        value={value}
        onDropdownVisibleChange={dummy}
        maxTagCount="responsive"
        
      />
    )
   }
}
export default App;