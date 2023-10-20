import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import InputPrimary from '../components/InputPrimary'
import ButtonPrimary from '../components/ButtonPrimary'
import { FiLogOut } from 'react-icons/fi'
import { FaUserMd, FaRegEnvelope, FaArrowAltCircleLeft } from 'react-icons/fa'
import { FiPlus, FiEdit, FiShare2, FiEye } from 'react-icons/fi'
// import { useNavigate } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import Popup from '../components/Popup'

import {
  addDoctorAdmin,
  getDoctorsList,
  getPatientsList,
  getReportsList,
  logout,
  updateLungAudioReport,
} from '../API'

const AddDoctor = () => {
  const navigate = useNavigate()
  const [toggleModal, setToggleModal] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newDoctor = await addDoctorAdmin({
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile: mobile,
        password: password,
        confirm_password: confirmPassword,
      })
      if (newDoctor) {
        console.log('yaha tak')
        const doctors = await getDoctorsList()
        // setAllJournals(journals)

        console.log(doctors)
        setToggleModal(true)
        setFirstName('')
        setLastName('')
        setEmail('')
        setMobile('')
        setPassword('')
        setConfirmPassword('')
        return
      }
      else{
          
        // toast.error(`Something Happended, Please Try Again Later`)
      }
    } catch(err) {
      toast.error(`Something Happended, Please Try Again `)
    }
  }

  const handleModalClick = () => {
    console.log(toggleModal)
    setToggleModal((toggleModal) => !toggleModal)
  }
  return (
    <>
      <div
        className={`${toggleModal && 'hidden'}
    h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed flex justify-center items-center`}
      >
        <div className="bg-white shadow-lg rounded-3xl md:w-3/5  md:m-auto m-5 md:p-8 p-5 ">
          <div className="md:w-3/5 mx-auto">
            <h2 className="md:text-3xl text-lg my-2">Add Doctor</h2>
            <form className="text-left">
              {/* <div onChange={(e) => setFirstName(e.target.value)}> */}
              {/* <div> */}
              <InputPrimary
                type={'text'}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                name={'first_name'}
                label={'first Name'}
                width={'full'}
                placeholer={'Enter your First Name..'}
              />
              {/* </div> */}

              {/* <div onChange={(e) => setLastName(e.target.value)}> */}
              {/* <div> */}
              <InputPrimary
                type={'text'}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                name={'last_name'}
                label={'last Name'}
                width={'full'}
                placeholer={'Enter your Last Name..'}
              />
              {/* </div> */}

              {/* <div onChange={(e) => setEmail(e.target.value)}> */}
              {/* <div> */}
              <InputPrimary
                type={'email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name={'email'}
                label={'email'}
                width={'full'}
                placeholer={'Enter your Email Address'}
              />
              {/* </div> */}

              {/* <div onChange={(e) => setMobile(e.target.value)}> */}
              {/* <div> */}
              <InputPrimary
                type={'tel'}
                name={'phone_number'}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                label={'title'}
                width={'full'}
                placeholer={'Enter your journal title...'}
              />
              {/* </div> */}

              {/* <div onChange={(e) => setPassword(e.target.value)}> */}
              {/* <div> */}
              <InputPrimary
                type={'password'}
                name={'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label={'password'}
                width={'full'}
              />
              {/* </div> */}

              {/* <div onChange={(e) => setConfirmPassword(e.target.value)}> */}
                {/* <div> */}
                <InputPrimary
                  type={'password'}
                  name={'confirm_password'}
                  value ={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  label={'confirm_password'}
                  width={'full'}
                />
              {/* </div> */}
            </form>
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={handleModalClick}
                className="text-gray-500 hover:underline"
              >
                Close
              </button>
              <ButtonPrimary text={'Add Doctor'} handleClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-screen flex flex-col justify-center iteems-center bg-[#eafaf5]">
        <div className="md:w-2/5 p-8 mx-auto rounded-2xl bg-white">
          <h3 className="text-3xl font-medium text-green-1 text-center text-green">
            Admin Panel
          </h3>
          <ButtonPrimary
            text="Add Doctor"
            width={'full'}
            handleClick={handleModalClick}
          />
          <ButtonPrimary
            text="View All Doctors"
            width={'full'}
            handleClick={() => navigate('/Dashboard')}
          />
          <div className="text-center w-full mt-5"></div>
        </div>
      </div>
    </>
  )
}

export default AddDoctor
