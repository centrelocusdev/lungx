import React, { useState } from "react";
import InputPrimary from "../components/InputPrimary";
import ButtonPrimary from "../components/ButtonPrimary";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

import { login } from "../API";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    is_admin: true
  });
  const [isSelected, setIsSelected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFormDataChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isSelected)
    if(isSelected === true){
    setIsLoading(true)
    console.log("res")
    const res = await login(formData)
    if(res && (res.is_admin || res.is_doctor)) {
      if(res.is_admin){
        setIsLoading(false)
        navigate('/AddDoctor' , {state: {is_admin: res.is_admin, is_doctor: res.is_doctor}});
      }else if(res.is_doctor){
        setIsLoading(false)
        navigate('/DoctorDashboard' , {state: {is_admin: res.is_admin, is_doctor: res.is_doctor}});
      }
    } else {
      setIsLoading(false)
    }}
    else
    {
      toast.error('Please Select The login Type')
    }
  };

  const handleChange = (e) =>{
    console.log(e.target.value)
    setIsSelected(true)

  }
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#eafaf5]">
      <div className="md:w-2/5 p-8 mx-auto rounded-2xl bg-white">
        <h3 className="text-3xl font-medium text-green-1 text-center text-green">
          Admin Login
        </h3>
        <div className="flex md:w-4/5 mx-auto mt-4 p-2 ">
    <div class="flex items-center mr-4">
        <input id="radio1" type="radio" value="Admin" onChange={handleChange} name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "/>
        <label for="radio1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Admin Login</label>
    </div>
    <div class="flex items-center mr-4">
        <input id="radio2" type="radio" value="Doctor" onChange={handleChange}  name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
        <label for="radio2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Doctor's Login</label>
    </div>
    </div>
        <form
          onSubmit={handleSubmit}
          onChange={handleFormDataChange}
          className="md:w-4/5 mx-auto"
        >
          <InputPrimary
            type={"email"}
            name={"email"}
            placeholder={"johndoe@gmail.com"}
          />
          <InputPrimary
            type={"password"}
            name={"password"}
            placeholder={"Enter strong password"}
          />
          <ButtonPrimary text={isLoading ? 'logging in...' : 'login'} width={"full"} />
        </form>
        <div className="text-center w-full mt-5">
        </div>
      </div>
    </div>
  );
};

export default Login;
