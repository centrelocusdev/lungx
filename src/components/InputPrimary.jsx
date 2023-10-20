import React from "react";
import MySelect from "./Select";
import  Cascader  from "./Cascader";

const InputPrimary = ({ type, name, placeholder, value, onChange, disabled }) => {
  return (
    <div className="w-full mt-1 text-gray-600">
      <label htmlFor={name} className="capitalize text-lg block font-medium">
        {name.split('_').join(' ')}
      </label>
      {/* <MySelect/> */}
      {/* <Cascader/> */}
      
      <input
        type={type ? type : 'text'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`w-full bg-[#D1D1D147] rounded px-4 py-2 mt-1 focus:outline-none focus:bg-white focus:border-[#D1D1D147] border border-transparent ${
          disabled && 'cursor-not-allowed'
        }`}
      />
    </div>
  )
};


export default InputPrimary;
