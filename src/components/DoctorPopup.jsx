import React, { useEffect, useState } from 'react'
import ButtonPrimary from './ButtonPrimary'
import InputPrimary from './InputPrimary'
// import { updateReport } from '../API'

const doctorPopup = (doctor) => {



     return (
      <div
        className={`${toggleModal && 'hidden'}
    h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed flex justify-center items-center`}
      >
        <div className="bg-white shadow-lg rounded-3xl md:w-3/5 md:m-auto m-5 md:p-16 p-5 ">
          <div className="md:w-3/5 mx-auto">
            <h2 className="md:text-3xl text-lg my-5">Add Doctor</h2>
            


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



)}

export default doctorPopup;