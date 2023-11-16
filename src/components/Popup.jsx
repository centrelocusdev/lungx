import React, { useEffect, useState } from 'react'
import ButtonPrimary from './ButtonPrimary'
import InputPrimary from './InputPrimary'
import { toast } from 'react-toastify'
import InputPrimaryAudioTag from './InputPrimaryAudioTag'
import Select from 'react-select'
import InputPrimaryCascader from './InputPrimaryCascader'

import {
  getDoctorsList,
  getPatientsByDoctorID,
  getPatientsList,
  getReportsList,
  logout,
  updateLungAudioReport,
  shareData,
  updatePatientHealthReport,
} from '../API'
import AudioPlayer from './AudioPlayer'

const Popup = ({ doctorsList, display, report }) => {
  console.log(report.lung_audio.p1_tag,'in popup')
  const { patient, patienthealthdata, lung_audio } = report
  console.log(patient, patienthealthdata, lung_audio, 'all three')
  const [isLoading, setIsLoading] = useState(false)
  const [toggleModal, setToggleModal] = useState(true)

  
  const [formData, setFormData] = useState({
  })
  const [initialFormData, setInitialFormData] = useState({})
  const [isDataReady, setIsDataReady] = useState(false);
  
  const [patientData, setPatientData] = useState({
    temperature: '',
    oxygen_saturation: '',
    blood_pressure: '',
    weight: '',
    chronic_diseases: '',
    chief_complaints: '',
    diagnosis_notes: '',
    lifestyle_habits: '',
    additional_notes: '',
  })
  
  
  // console.log(lung_audio,"One")
  // console.log(JSON.parse(lung_audio.p1_tag),JSON.parse(lung_audio.p1_tag).options,"One")

// let audio_tag 
// const modify = (tag)=> {
  //   const options = JSON.parse(tag).options
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
  // useEffect(() => {
  //   const lung_fields = {
  //     p0_tag: modify(lung_audio.p0_tag),
  //     p1_tag: modify(lung_audio.p1_tag),
  //     p2_tag: modify(lung_audio.p2_tag),
  //     p3_tag: modify(lung_audio.p3_tag),
  //     p4_tag: modify(lung_audio.p4_tag),
  //     p5_tag: modify(lung_audio.p5_tag),
  //     p6_tag: modify(lung_audio.p6_tag),
  //     p7_tag: modify(lung_audio.p7_tag),
  //     p8_tag: modify(lung_audio.p8_tag),
  //     p9_tag: modify(lung_audio.p9_tag),
  //     p10_tag: modify(lung_audio.p10_tag),
  //     p11_tag: modify(lung_audio.p11_tag),
  //     p12_tag: modify(lung_audio.p12_tag),
  //   }
  useEffect(() => {
    const lung_fields = {
      p0_tag: lung_audio.p0_tag,
      p1_tag: lung_audio.p1_tag,
      p2_tag: lung_audio.p2_tag,
      p3_tag: lung_audio.p3_tag,
      p4_tag: lung_audio.p4_tag,
      p5_tag: lung_audio.p5_tag,
      p6_tag: lung_audio.p6_tag,
      p7_tag: lung_audio.p7_tag,
      p8_tag: lung_audio.p8_tag,
      p9_tag: lung_audio.p9_tag,
      p10_tag: lung_audio.p10_tag,
      p11_tag: lung_audio.p11_tag,
      p12_tag: lung_audio.p12_tag,
    }
    // lung_audio.map((audio))
    setFormData(lung_fields)
    setInitialFormData(lung_fields)
    const patient_data = {
      temperature: patienthealthdata.temperature,
      oxygen_saturation: patienthealthdata.oxygen_saturation,
      blood_pressure: patienthealthdata.blood_pressure,
      weight: patienthealthdata.weight,
      chronic_diseases: patienthealthdata.chronic_diseases,
      chief_complaints: patienthealthdata.chief_complaints,
      diagnosis_notes: patienthealthdata.diagnosis_notes,
      lifestyle_habits: patienthealthdata.lifestyle_habits,
      additional_notes: patienthealthdata.additional_notes,
    }
    setPatientData(patient_data)
    setIsDataReady(true)
    // console.log(formData,'Formdata',lung_fields)
    
  }, [])
  
  const handleModalClick = () => {
    // console.log(toggleModal)
    setToggleModal((toggleModal) => !toggleModal)
  }

  const handlePatientChange = (e)=>{
    setPatientData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  //  console.log(patientData,'patient_change')
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    // console.log(formData,"It is Form Data")
  }

  const handleShare = async (doctorId, reportId) => {
    // report aka lung_adio data
    // report id aka lund_audio id
    // here i don't have
    //  request_data = {
    // # *     'doctor_id': 2, // to whom we wnat to share the data
    // # *     'patient_id': 1, // the patient id of lund audio (report) data
    // # *     'patient_health_ids': [1, 2, 3] // the patient_health_id of that particular patient
    // # *     'lung_audio_ids': [1, 2, 3]  // the lung_audio_id of that particular patient
    // # * }
    // we don't have patient_health id so i am making it default as :1
    //  console.log(doctorId,"In DoctorId")
    try {
      const isShared = await shareData({
        doctor_id: doctorId,
        patient_id:patient.id, // report aka lung_audio has patient_id and doctorid(the one who created [or attended] this patient)
        lung_audio_ids: lung_audio.id, // report.id aka lung_audio_id
        patient_health_ids: patienthealthdata.id, // making it default since we don't have any method tp get  patient_health_ids
      })
      // console.log(isShared, 'isshared')
      if (isShared) {
        toast.success(`The Patient Data Has been Shared`)
        handleModalClick()
        return display()
      }
    } catch (err) {
      // console.log(err.response.status, err, 'in handleshare')
      toast.error(`Something Happended, Please Try Again api `)
    }
    handleModalClick() // to remove the popued up sharing doctor list
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const updatedFields = {}
    Object.keys(formData).forEach((fieldName) => {
      if (formData[fieldName] !== initialFormData[fieldName]) {
        updatedFields[fieldName] = formData[fieldName]
      }
    })
    // console.log(updatedFields)
    const res = await updateLungAudioReport({
      id: lung_audio.id,
      ...updatedFields,
    })

    const res1 = await updatePatientHealthReport(patient.doctor, {
      patient_health_id: patienthealthdata.id,
      ...patientData,
    })
    // console.log(res, 'updated Lung form data')
    // console.log(res1,'updated Patient Health Data ')
    res && display()
    res &&
      setFormData({
        p0_tag: '',
        p1_tag: '',
        p2_tag: '',
        p3_tag: '',
        p4_tag: '',
        p5_tag: '',
        p6_tag: '',
        p7_tag: '',
        p8_tag: '',
        p9_tag: '',
        p10_tag: '',
        p11_tag: '',
        p12_tag: '',
      })
    res && setIsLoading(false)
  }

  return (
    <>
      {/* <div className={`${toggleModal && 'hidden'}
    h-screen w-screen bg-[rgba(0,0,0,0.4)]  fixed flex justify-center items-center`} >
        <div className="bg-white shadow-lg rounded-3xl md:w-3/5 md:h-4/5 md:m-auto m-5 md:p-12 p-5 ">
          <div className="md:w-4/5 md:h-4/5 mx-auto overflow-scroll "> */}
      <div
        className={`${toggleModal && 'hidden'}
    min-h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed flex justify-center items-center`}
      >
        <div className="bg-white shadow-lg rounded-3xl h-screen md:m-auto m-5 md:p-12 p-5 overflow-scroll  ">
          <div className=" mx-auto  ">
            {doctorsList?.length ? (
              <table className="min-w-full min-h-full divide-y divide-green-3 ">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">S.No.</th>
                    <th className="py-3 px-4 text-left">Doctor's Name</th>
                    <th className="py-3 px-4 text-left">Doctor's Email</th>
                    <th className="py-3 px-4 text-left">Share</th>
                  </tr>
                </thead>
                <tbody className="bg-white  ">
                  {doctorsList.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <td className="py-3 px-4 text-left">{index + 1}</td>
                      <td className="py-3 px-4 text-left">
                        {item.first_name} {item.last_name}
                      </td>
                      <td className="py-3 px-4 text-left">{item.email}</td>
                      <td className="py-3 px-4 text-left">
                        <ButtonPrimary
                          text={'Share'}
                          handleClick={() => handleShare(item.id, report)}
                        />
                        {/* <button
                        onClick={(e) => handleshare(item.id)}
                        className="text-green-1 hover:underline"
                        >
                        Share
                      </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-xl text-gray-400 text-center">
                No doctor found
              </div>
            )}
          </div>
        </div>
      </div>
      {isDataReady ? <div className={`${!toggleModal && 'hidden' }`}>
        <div className="w-screen min-h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur flex fixed justify-center items-center  p-8 md:p-0 ">
          <div className="md:w-4/5 rounded-2xl h-screen mx-auto bg-white p-8 overflow-scroll ">
            {/* <div className={`${toggleModal && 'hidden'}`}>
          {doctorsList?.length ? (
            <table className="min-w-full divide-y divide-green-3 overflow-scroll">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">S.No.</th>
                  <th className="py-3 px-4 text-left">Doctor's Name</th>
                  <th className="py-3 px-4 text-left">Doctor's Email</th>
                  <th className="py-3 px-4 text-left">Share</th>
                </tr>
              </thead>
              <tbody className="bg-white ">
                {doctorsList.map((item, index) => (
                  <tr
                  key={item.id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="py-3 px-4 text-left">{index + 1}</td>
                    <td className="py-3 px-4 text-left">
                      {item.first_name} {item.last_name}
                    </td>
                    <td className="py-3 px-4 text-left">{item.email}</td>
                    <td className="py-3 px-4 text-left">
                      <ButtonPrimary
                        text={'Share'}
                        handleClick={() => handleShare(item.id, report.id)}
                      />
                      {/* <button
                        onClick={(e) => handleshare(item.id)}
                        className="text-green-1 hover:underline"
                        >
                        Share
                      </button> */}
            {/* </td> */}
            {/* </tr> */}
            {/* ))} */}
            {/* </tbody>
            </table>
           ) : (
            <div className="text-xl text-gray-400 text-center">
              No doctor found
            </div>
           )} */}
            {/* </div> } */}
            <h4 className="text-2xl text-theme-primary border-b pb-2 font-semibold text-green-1">
              Edit Report
            </h4>
            <div className="flex gap-4">
              <InputPrimary
                name={'patient_name'}
                value={patient.patient_name}
                disabled={true}
              />
              <InputPrimary
                name={'patient_code'}
                value={patient.patient_code}
                disabled={true}
              />
              <InputPrimary
                name={'patient_Type'}
                value={
                  patient.in_patient === true ? 'In Patient' : 'Out Patient'
                }
                disabled={true}
              />
            </div>
            <div className="flex gap-2">
              <InputPrimary
                name={'patient_Age'}
                value={patienthealthdata.age}
                disabled={true}
              />
              <InputPrimary
                name={'patient_Gender'}
                value={patienthealthdata.gender}
                disabled={true}
              />
              <InputPrimary
                name={'patient_Session'}
                value={patienthealthdata.session}
                disabled={true}
              />
            </div>
            <div className="flex gap-2">
              <InputPrimary
                name={'weight'}
                value={patientData.weight}
                onChange={handlePatientChange}
                //             temperature: '',
                // oxygen_saturation: '',
                // blood_pressure: '',
                // weight: '',
                // chronic_diseases: '',
                // chief_complaints: '',
                // diagnosis_notes: '',
                // lifestyle_habits: '',
                // additional_notes: '',
              />
              <InputPrimary
                name={'temperature'}
                value={patientData.temperature}
                onChange={handlePatientChange}
              />
              <InputPrimary
                name={'oxygen_saturation'}
                value={patientData.oxygen_saturation}
                onChange={handlePatientChange}
              />
            </div>
            <div className="flex gap-2">
              <InputPrimary
                name={'blood_pressure'}
                value={patientData.blood_pressure}
                onChange={handlePatientChange}
              />
              <InputPrimaryCascader
                name={'chronic_diseases'}
                value={patientData.chronic_diseases}
                onChange={handlePatientChange}
              />
              <InputPrimaryCascader
                name={'chief_complaints'}
                value={patientData.chief_complaints}
                onChange={handlePatientChange}
              />
            </div>
            <div className="flex gap-2">
              <InputPrimary
                name={'diagnosis_notes'}
                value={patientData.diagnosis_notes}
                onChange={handlePatientChange}
              />
              <InputPrimaryCascader
                name={'lifestyle_habits'}
                value={patientData.lifestyle_habits}
                onChange={handlePatientChange}
              />
              <InputPrimary
                name={'additional_notes'}
                value={patientData.additional_notes}
                onChange={handlePatientChange}
              />
            </div>

            <div  className="">
              <div className="flex gap-2">
                {/* <audio src={`https://lung.thedelvierypointe.com${lung_audio.p0_audio}`}/> */}
                {/* <AudioPlayer audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p0_audio}`} /> */}
                <InputPrimaryAudioTag
                  name={'p0_tag'}
                  value={formData.p0_tag}
                  onChange={handleChange}
                  lung_audio={lung_audio.p0_audio}
                />
                <InputPrimaryAudioTag
                  name={'p1_tag'}
                  value={formData.p1_tag}
                  onChange={handleChange}
                  lung_audio={lung_audio.p1_audio}
                />
                <InputPrimaryAudioTag
                  name={'p2_tag'}
                  value={formData.p2_tag}
                  onChange={handleChange}
                  lung_audio={lung_audio.p2_audio}
                />

                {/* <InputPrimary name={'p0_tag'} />
                <InputPrimary name={'p1_tag'} /> */}
              </div>
              <div className="flex gap-2">
                {/* <InputPrimary name={'p2_tag'} />
                <InputPrimary name={'p3_tag'} /> */}
                <InputPrimaryAudioTag
                  name={'p3_tag'}
                  value={formData.p3_tag}
                  onChange={handleChange}
                  lung_audio={lung_audio.p3_audio}
                />
                <InputPrimaryAudioTag
                  name={'p4_tag'}
                  value={formData.p4_tag}
                  onChange={handleChange}
                  lung_audio={lung_audio.p4_audio}
                />
                <InputPrimaryAudioTag
                  name={'p5_tag'}
                  value={formData.p5_tag}
                  onChange={handleChange}
                  lung_audio={lung_audio.p5_audio}
                />
              </div>
              <div className="flex gap-2">
                {/* <InputPrimary name={'p4_tag'} />
                <InputPrimary name={'p5_tag'} /> */}
                <InputPrimaryAudioTag
                  name={'p6_tag'}
                  value={formData.p6_tag}
                  onChange={handleChange}
                  lung_audio={lung_audio.p6_audio}
                />
                <InputPrimaryAudioTag
                  name={'p7_tag'}
                  value={formData.p7_tag}
                  onChange={handleChange}
                  lung_audio={lung_audio.p7_audio}
                />
                <InputPrimaryAudioTag
                  name={'p8_tag'}
                  value={formData.p8_tag}
                  onChange={handleChange}
                  lung_audio={lung_audio.p8_audio}
                />
              </div>
              <div className="flex gap-2">
                {/* <InputPrimary name={'p4_tag'} />
                <InputPrimary name={'p5_tag'} /> */}
                <InputPrimaryAudioTag
                  name={'p9_tag'}
                  value={formData.p9_tag}
                  onChange={handleChange}
                  lung_audio={lung_audio.p9_audio}
                />
                <InputPrimaryAudioTag
                  name={'p10_tag'}
                  value={formData.p10_tag}
                  onChange={handleChange}
                  lung_audio={lung_audio.p10_audio}
                />
                <InputPrimaryAudioTag
                  name={'p11_tag'}
                  value={formData.p11_tag}
                  onChange={handleChange}
                  lung_audio={lung_audio.p11_audio}
                />
                <InputPrimaryAudioTag
                  name={'p12_tag'}
                  value={formData.p12_tag}
                  onChange={handleChange}
                  lung_audio={lung_audio.p12_audio}
                />
              </div>

              <ButtonPrimary
                text={'Update'}
                handleClick={handleSubmit}
                width={'full'}
              />
              <ButtonPrimary
                text={'Share'}
                handleClick={handleModalClick}
                width={'full'}
              />
            </div>
            <button
              onClick={display}
              className="text-gray-500 text-center w-full underline hover:text-green-1"
            >
              Close
            </button>
          </div>
        </div>
      </div>:<div>Data is not ready yet</div> }
    </>
  )
}

export default Popup
