import React from "react";

const ButtonPrimary = ({ text, icon, handleClick, width }) => {
  return (
    <button onClick={handleClick} className={`bg-green-1 text-white hover:bg-green-2 font-semibold w-${width ? width : 'fit'}  capitalize rounded px-6 py-2 flex justify-center items-center gap-2  mt-5 mb-3`}>
     {text}  {icon}
    </button>
  );
};

export default ButtonPrimary;
