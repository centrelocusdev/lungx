import React, { useState } from "react";
import InputPrimary from "../components/InputPrimary";
import ButtonPrimary from "../components/ButtonPrimary";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../API";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    is_admin: true
  });
  const [isLoading, setIsLoading] = useState(false)

  const handleFormDataChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    console.log("res")
    const res = await login(formData)
    if(res) {
      setIsLoading(false)
      navigate('/AddDoctor');
    } else {
      setIsLoading(false)
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#eafaf5]">
      <div className="md:w-2/5 p-8 mx-auto rounded-2xl bg-white">
        <h3 className="text-3xl font-medium text-green-1 text-center text-green">
          Admin Login
        </h3>

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
