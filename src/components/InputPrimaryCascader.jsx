import React from "react";
import MySelect from "./Select";
import  CascaderTag  from "./Cascader";

const defaultDiseaseJsonFormat = [
  {"id":1,"title":"Asthma","isChecked":false,"optionid":2,
  "options":[{"id":1,"title":"< 1 Year","isChecked":false},
  {"id":2,"title":"< 5 Years","isChecked":false},
  {"id":3,"title":"< 10 Years","isChecked":false},
  {"id":4,"title":"> 10 Years","isChecked":false}]
},

  {"id":2,"title":"Hypertension","isChecked":false,"optionid":2,
  "options":[{"id":1,"title":"< 1 Year","isChecked":false},
  {"id":2,"title":"< 5 Years","isChecked":false},
  {"id":3,"title":"< 10 Years","isChecked":false},
  {"id":4,"title":"> 10 Years","isChecked":false}]
},
  {"id":3,"title":"Diabetes","isChecked":false,"optionid":2,
  "options":[{"id":1,"title":"< 1 Year","isChecked":false},
  {"id":2,"title":"< 5 Years","isChecked":false},
  {"id":3,"title":"< 10 Years","isChecked":false},
  {"id":4,"title":"> 10 Years","isChecked":false}]
},
  {"id":4,"title":"Heart Disease","isChecked":false,"optionid":2,
  "options":[{"id":1,"title":"< 1 Year","isChecked":false},
  {"id":2,"title":"< 5 Years","isChecked":false},
  {"id":3,"title":"< 10 Years","isChecked":false},
  {"id":4,"title":"> 10 Years","isChecked":false}]},
]

const cascaderDiseaseOptions = [
  {  
      label:'Asthma',
      value:'Asthma',
      disableCheckbox: true,
      children:[
          {label:'Asthma < 1 Year',
              value:'< 1 Year', },
          {label:'Asthma < 5 Years',
              value:'< 5 Years', },
          {label:'Asthma < 10 Years',
              value:'< 10 Years', },
          {label:'Asthma  > 10 Years',
              value:'> 10 Years', },
      ]
  },
  {
      label:'Hypertension',
      value:'Hypertension',
      disableCheckbox: true,
      children:[
          {label:'Hypertension < 1 Year',
              value:'< 1 Year', },
          {label:'Hypertension < 5 Years',
              value:'< 5 Years', },
          {label:'Hypertension < 10 Years',
              value:'< 10 Years', },
          {label:'Hypertension > 10 Years',
              value:'> 10 Years', },
      ]
  },
  {
      label:'Diabetes',
      value:'Diabetes',
      disableCheckbox: true,
      children:[
          {label:'Diabetes < 1 Year',
              value:'< 1 Year', },
          {label:'Diabetes < 5 Years',
              value:'< 5 Years', },
          {label:'Diabetes < 10 Years',
              value:'< 10 Years', },
          {label:'Diabetes > 10 Years',
              value:'> 10 Years', },
      ]
  },
  {
      label:'Heart Disease',
      value:'Heart Disease',
      disableCheckbox: true,
      children:[
          {label:'Heart Disease < 1 Year',
              value:'< 1 Year', },
          {label:'Heart Disease < 5 Years',
              value:'< 5 Years', },
          {label:'Heart Disease < 10 Years',
              value:'< 10 Years', },
          {label:'Heart Disease > 10 Years',
              value:'> 10 Years', },
      ]
  },

]
const defaultHabitsJsonFormat = [
  {"id":1,"title":"Alcohol","isChecked":false,"optionid":2,
  "options":[{"id":1,"title":"< 1 Year","isChecked":false},
  {"id":2,"title":"< 5 Years","isChecked":false},
  {"id":3,"title":"< 10 Years","isChecked":false},
  {"id":4,"title":"> 10 Years","isChecked":false}]
},

  {"id":2,"title":"Smoking","isChecked":false,"optionid":2,
  "options":[{"id":1,"title":"< 1 Year","isChecked":false},
  {"id":2,"title":"< 5 Years","isChecked":false},
  {"id":3,"title":"< 10 Years","isChecked":false},
  {"id":4,"title":"> 10 Years","isChecked":false}]
},
]

const cascaderHabitsOptions = [
  {  
      label:"Alcohol",
      value:"Alcohol",
      disableCheckbox: true,
      children:[
          {label:'Alcohol  < 1 Year',
              value:'< 1 Year', },
          {label:'Alcohol  < 5 Years',
              value:'< 5 Years', },
          {label:'Alcohol   < 10 Years',
              value:' < 10 Years', },
          {label:' Alcohol   > 10 Years',
              value:'> 10 Years', },
      ]
  },
  {
      label:"Smoking",
      value:"Smoking",
      disableCheckbox: true,
      children:[
          {label:'Smoking < 1 Year',
              value:'< 1 Year', },
          {label:'Smoking < 5 Years',
              value:'< 5 Years', },
          {label:'Smoking < 10 Years',
              value:'< 10 Years', },
          {label:'Smoking > 10 Years',
              value:'> 10 Years', },
      ]
  },
  

]

const defaultComplaintsJsonFormat = [
  {"id":1,"title":"Cough","isChecked":false,"optionid":2,
  "options":[{"id":1,"title":"1 - 7 days","isChecked":false},
  {"id":2,"title":"> 7 days","isChecked":false},
  {"id":3,"title":"> 1 week","isChecked":false},
  {"id":4,"title":"> 1 month","isChecked":false}]
},
  {"id":2,"title":"Breathlessness","isChecked":false,"optionid":2,
  "options":[{"id":1,"title":"1 - 7 days","isChecked":false},
  {"id":2,"title":"> 7 days","isChecked":false},
  {"id":3,"title":"> 1 week","isChecked":false},
  {"id":4,"title":"> 1 month","isChecked":false}]
},
  {"id":3,"title":"Cold","isChecked":false,"optionid":2,
  "options":[{"id":1,"title":"1 - 7 days","isChecked":false},
  {"id":2,"title":"> 7 days","isChecked":false},
  {"id":3,"title":"> 1 week","isChecked":false},
  {"id":4,"title":"> 1 month","isChecked":false}]
},
  {"id":4,"title":"Fever","isChecked":false,"optionid":2,
  "options":[{"id":1,"title":"1 - 7 days","isChecked":false},
  {"id":2,"title":"> 7 days","isChecked":false},
  {"id":3,"title":"> 1 week","isChecked":false},
  {"id":4,"title":"> 1 month","isChecked":false}]
},
  {"id":5,"title":"Weight loss","isChecked":false,"optionid":2,
  "options":[{"id":1,"title":"1 - 7 days","isChecked":false},
  {"id":2,"title":"> 7 days","isChecked":false},
  {"id":3,"title":"> 1 week","isChecked":false},
  {"id":4,"title":"> 1 month","isChecked":false}]
},

]
const cascaderComplaintsOptions = [
  {  
    label:'Cough',
    value:'Cough',
    disableCheckbox: true,
    children:[
        {label:'Cough 1 - 7 days',
            value:'1 - 7 days', },
        {label:'Cough > 7 days',
            value:'> 7 days', },
        {label:'Cough > 1 week',
            value:'> 1 week', },
        {label:'Cough > 1 month',
            value:'> 1 month', },
    ]
},
  {  
    label:'Breathlessness',
    value:'Breathlessness',
    disableCheckbox: true,
    children:[
        {label:'Breathlessness 1 - 7 days',
            value:'1 - 7 days', },
        {label:'Breathlessness > 7 days',
            value:'> 7 days', },
        {label:'Breathlessness > 1 week',
            value:'> 1 week', },
        {label:'Breathlessness > 1 month',
            value:'> 1 month', },
    ]
},
  {  
    label:'Cold',
    value:'Cold',
    disableCheckbox: true,
    children:[
        {label:'Cold 1 - 7 days',
            value:'1 - 7 days', },
        {label:'Cold > 7 days',
            value:'> 7 days', },
        {label:'Cold > 1 week',
            value:'> 1 week', },
        {label:'Cold > 1 month',
            value:'> 1 month', },
    ]
},
  {  
    label:'Fever',
    value:'Fever',
    disableCheckbox: true,
    children:[
        {label:'Fever 1 - 7 days',
            value:'1 - 7 days', },
        {label:'Fever > 7 days',
            value:'> 7 days', },
        {label:'Fever > 1 week',
            value:'> 1 week', },
        {label:'Fever > 1 month',
            value:'> 1 month', },
    ]
},
  {  
    label:'Weight loss',
    value:'Weight loss',
    disableCheckbox: true,
    children:[
        {label:'Weight loss 1 - 7 days',
            value:'1 - 7 days', },
        {label:'Weight loss > 7 days',
            value:'> 7 days', },
        {label:'Weight loss > 1 week',
            value:'> 1 week', },
        {label:'Weight loss > 1 month',
            value:'> 1 month', },
    ]
},

]
const InputPrimary = ({ type, name, placeholder, value, onChange, disabled }) => {
  console.log(JSON.parse(value))

  let defaultJsonFormat = []
  let cascaderOptions = []
  if (name === 'chronic_diseases')
  {
    defaultJsonFormat  = defaultDiseaseJsonFormat
    cascaderOptions = cascaderDiseaseOptions
  }
  else if (name === 'lifestyle_habits')
  {
    defaultJsonFormat  = defaultHabitsJsonFormat
    cascaderOptions = cascaderHabitsOptions
  }
  else if (name === 'chief_complaints')
  {
    defaultJsonFormat  = defaultComplaintsJsonFormat
    cascaderOptions = cascaderComplaintsOptions
  }
  

  return (
    <div className="w-full mt-3 text-gray-600">
      <label htmlFor={name} className="capitalize text-lg block font-medium">
        {name.split('_').join(' ')}
      </label>
      {/* <MySelect/> */}
      <CascaderTag value1 ={value} name1={name} onChange={onChange} defaultJsonFormat={defaultJsonFormat}  cascaderOptions={cascaderOptions}/>
      
      {/* <input
        type={type ? type : 'text'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`w-full bg-[#D1D1D147] rounded px-4 py-2 mt-1 focus:outline-none focus:bg-white focus:border-[#D1D1D147] border border-transparent ${
          disabled && 'cursor-not-allowed'
        }`}
      /> */}
    </div>
  )
};


export default InputPrimary;