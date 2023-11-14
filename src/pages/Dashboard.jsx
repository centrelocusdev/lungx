import React, { useEffect, useState } from 'react'
import {
  ViewFullReport,
  getDoctorsList,
  getPatientsByDoctorID,
  getPatientsList,
  getReportsList,
  logout,
  updateLungAudioReport,
} from '../API'
import ButtonPrimary from '../components/ButtonPrimary'
import { FiLogOut } from 'react-icons/fi'
import { FaUserMd, FaRegEnvelope, FaArrowAltCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Popup from '../components/Popup'
import Popup2 from '../components/Popup2';
import doctorPopup from '../components/DoctorPopup'

const Dashboard = () => {
  const navigate = useNavigate()
  const [doctorsList, setDoctorsList] = useState([])
  const [patientsList, setPatientsList] = useState([])
  const [patientsFilterList, setPatientsFilterList] = useState([])
  const [reportsList, setReportsList] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [showDoctorPopup, setShowDoctorPopup] = useState(false)
  const [report, setReport] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const res = await getDoctorsList()
      // console.log(res,"in getdoctorlist")
      const filter = await res.map((r) => r.user)
      // const filter = await res.map((r) => {user:r.user, hospital:r.profile.hospital })
      // const filter = res.map((r) => ({
      //   user: r.user,
      //   hospital: r.profile.hospital
      // }));
      
      // console.log(filter,"filter")
      setDoctorsList(filter)
    }

    fetchData()
  }, [])

  const tabs = ['doctors', 'patients', 'reports']
  const [tab, setTab] = useState(tabs[0])

  const handleLogoutClick = async () => {
    const res = await logout()
    res && navigate('/login')
  }

  const handleViewPatientsClick = async (id) => {
    // const res = await getPatientsList({ doctor_id: id });
    const res = await getPatientsByDoctorID({ doctor_id: id })
    setPatientsList(res)
    setPatientsFilterList(res)
    setTab(tabs[1])
  }

  const handlePatientFilter = async (e)=>{
    const {  value } = e.target
    // console.log(value,typeof(value),"filter patient ")
    if(value==='out_patient')
    {
      return setPatientsFilterList(patientsList.filter((patient)=> patient.out_patient === true))
    }
    else if(value ==='in_patient'){
       return setPatientsFilterList(patientsList.filter((patient)=> patient.in_patient === true))
    }
     setPatientsFilterList(patientsList)
  }

  
  const handleViewReportsClick = async (patient_id, doctor_id) => {
    const res = await getReportsList({ patient_id, doctor_id })
    setReportsList(res)
    setTab(tabs[2])
  }

  const hanldeBackClick = () => {
    setTab(tabs[0])
  }

  const handleReportBackClick = () => {
    setTab(tabs[1])
  }

let scrollY = '0';
// to maintain scroll position after hiding

  const handleOpenPopupClick = async(item) => {
    // console.log(item,"i am in ")
    const res = await ViewFullReport(item)
    // console.log(res,"ye badiya hai guru ")
    if(res===false) {return}
    setReport(res)
    // when the popup is shown, we want a fixed background body
    document.body.style.position='fixed'
    document.body.style.top=`${window.scrollY}px`
    // console.log(window.scrollY,'scrolll wala hai')

    setShowPopup(true)
   
  }

  const handleClosePopupClick = () => { 
    scrollY = document.body.style.top;
    // console.log(scrollY,' ye close hone par scroll')
    document.body.style.position = ''
    document.body.style.top = ''
    window.scrollTo(0,parseInt(scrollY||'0')*-1);

    setShowPopup(false)
  
  
  }

  return (
    <>
      {showPopup && (
        <Popup2
          doctorsList={doctorsList}
          display={handleClosePopupClick}
          report={report}
        />
      )}
      <div className="w-screen min-h-screen  md:px-16 md:py-8">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-medium text-green-1 text-center border-b-4 pb-2 border-green-2">
            <span className="text-green-2">LungX</span> Admin Panel
          </h3>
          <ButtonPrimary
            text={'Logout'}
            icon={<FiLogOut />}
            handleClick={handleLogoutClick}
          />
        </div>
        {tab == tabs[0] && (
          <>
            {doctorsList?.length ? (
              <table className="min-w-full divide-y divide-green-3">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">S.No.</th>
                    <th className="py-3 px-4 text-left">Doctor's Name</th>
                    <th className="py-3 px-4 text-left">Doctor's Email</th>
                    <th className="py-3 px-4 text-left">Doctor's Mobile No.</th>
                    <th className="py-3 px-4 text-left">Hospital</th>
                    <th className="py-3 px-4 text-left"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
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
                      <td className="py-3 px-4 text-left">{item.mobile}</td>
                      <td className="py-3 px-4 text-left">{item.profile?.hospital}</td>
                      <td className="py-3 px-4 text-left">
                        <button
                          onClick={(e) => handleViewPatientsClick(item.id)}
                          className="text-green-1 hover:underline"
                        >
                          View Patients
                        </button>
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
          </>
        )}
        {tab == tabs[1] && (
          <>
            <button
              onClick={hanldeBackClick}
              className="text-green-1 text-lg flex items-center gap-1 mb-2 hover:underline"
            >
              <FaArrowAltCircleLeft /> Go Back
            </button>
            <select onClick={handlePatientFilter} className ={`bg-green-1 text-white  font-semibold w-fit  capitalize rounded px-6 py-2 flex justify-center items-center gap-2  mt-5 mb-3`} >
              <option value='all' >All Patients</option>
              <option value = 'in_patient'>In Patients</option>
              <option value = 'out_patient'>Out Patients </option>
            </select>

            {patientsFilterList?.length ? (
              <table className="min-w-full divide-y divide-green-3 capitalize">
                <thead className="bg-gray-100">
                  <tr>
                    {/* <th className="py-3 px-4 text-left">S.No.</th> */}
                    <th className="py-3 px-4 text-left">Patient Code</th>
                    <th className="py-3 px-4 text-left">Patient's Name</th>
                    {/* <th className="py-3 px-4 text-left">Patient's Gender</th> */}
                    <th className="py-3 px-4 text-left">Patient's Type</th>
                    <th className="py-3 px-4 text-left"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {patientsFilterList.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      {/* {console.log(item, 'patient id')} */}
                      {/* <td className="py-3 px-4 text-left">{item.id}</td> */}
                      <td className="py-3 px-4 text-left">
                        {item.patient_code}
                      </td>
                      <td className="py-3 px-4 text-left">
                        {item.patient_name}
                      </td>
                      {/* <td className="py-3 px-4 text-left">
                        {item.gender == 'F'
                          ? 'female'
                          : item.gender == 'M'
                          ? 'Male'
                          : item.gender}
                      </td> */}
                      <td className="py-3 px-4 text-left">
                        {item.in_patient === true
                          ? 'In Patient'
                          : item.out_patient === true
                          ? 'Out Patient'
                          : 'Patient Type is Not mentioned'}
                      </td>
                      <td className="py-3 px-4 text-left">
                        <button
                          onClick={(e) =>
                            handleViewReportsClick(item.id, item.doctor)
                          }
                          className="text-green-1 hover:underline"
                        >
                          View Reports
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-xl text-gray-400 text-center">
                No patients found for this doctor.
              </div>
            )}
          </>
        )}
        {tab == tabs[2] && (
          <>
            <button
              onClick={handleReportBackClick}
              className="text-green-1 text-lg flex items-center gap-1 mb-2 hover:underline"
            >
              <FaArrowAltCircleLeft /> Go Back
            </button>
            {reportsList[0]?.patienthealthdata?.length ? (
              <>
                {/* {console.log(reportsList[0].patienthealthdata)} */}
                <table className="min-w-full divide-y divide-green-3 capitalize">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left">S.No.</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Session</th>
                      <th className="py-3 px-4 text-left">Created at</th>
                      <th className="py-3 px-4 text-left">Last Modified at</th>
                      <th className="py-3 px-4 text-left"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {/* {reportlist mai 0 index par us particular patient data with patient health dataaaa raha hai} */}
                    {reportsList[0].patienthealthdata.map((item, index) => (
                      <tr
                        key={item.id}
                        className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      >
                        {' '}
                        {/* {console.log(item, 'reoprt ID')} */}
                        {/* const {id, status, session} =  */}
                        <td className="py-3 px-4 text-left">{item.id}</td>
                        <td className="py-3 px-4 text-left">{item.is_active==true? 'Active':'In Active'}</td>
                        <td className="py-3 px-4 text-left">{item.session}</td>
                        <td className="py-3 px-4 text-left">
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-left">
                          {new Date(item.last_modified_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-left">
                          <button
                            onClick={(e) => handleOpenPopupClick(item)}
                            className="text-green-1 hover:underline"
                          >
                            View Full Report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="text-xl text-gray-400 text-center">
                No reports found for this patient.
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Dashboard
