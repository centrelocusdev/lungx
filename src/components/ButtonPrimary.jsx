import React from "react";

const ButtonPrimary = ({ text, icon, handleClick, width , status, buttonType }) => {
  // console.log("status" , status);
  // console.log("button type" , buttonType);
  return (
    <button onClick={handleClick} className={`${(buttonType === 'share-button' && status === false) ? "bg-slate-400" : "bg-green-1"} text-white ${(buttonType === 'share-button' && status === false) ? "" : "hover:bg-green-2"}  font-semibold w-${width ? width : 'fit'}  capitalize rounded px-6 py-2 flex justify-center items-center gap-2  mt-5 mb-3 ${(buttonType === "share-button" && status=== false) ? "cursor-not-allowed" :" "}`}>
     {text}  {icon}
    </button>
  );
};

export default ButtonPrimary;
