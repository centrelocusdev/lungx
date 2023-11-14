import React, { useEffect, useState } from 'react'
import {
  ViewFullReport,
  getDoctorsList,
  getPatientsByDoctorID,
  getPatientsList,
  getReportsList,
  logout,
  updateLungAudioReport,
  viewSharedData,
  doctorOpinion,
  markDataAsViewed,
  isOpinionGiven,
} from '../API'
import { useLocation } from 'react-router-dom'
import ButtonPrimary from '../components/ButtonPrimary'
import { FiLogOut } from 'react-icons/fi'
import { FaUserMd, FaRegEnvelope, FaArrowAltCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Popup from '../components/Popup'
import Popup2 from '../components/Popup2';
import doctorPopup from '../components/DoctorPopup'

const DoctorDashboard = () => {
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false)
    const [shareData, setShareData] = useState([])
    const [openShareData, setOpenShareData] = useState([])
    let [isOpinionAlreadyGiven , setIsOpinionAlreadyGiven] = useState(false);
    const location = useLocation();
    let is_doctor = location.state.is_doctor;
    let is_admin = location.state.is_admin;
    console.log(is_doctor, is_admin);

    useEffect( ()=>{
      const fetchData = async () => {
        const res = await viewSharedData()
        console.log(res,"viewSharedData")
        setShareData(res)
        // const filter = await res.map((r) => r.user)
        // const filter = await res.map((r) => {user:r.user, hospital:r.profile.hospital })
        // const filter = res.map((r) => ({
        //   user: r.user,
        //   hospital: r.profile.hospital
        // }));
        
        // console.log(filter,"filter")
        // setDoctorsList(filter)
      }
      fetchData()
    },[] )

    const handleLogoutClick = async () => {
      const res = await logout()
      res && navigate('/login')
    }
  
    // const handleViewPatientsClick = async (id) => {
    //   // const res = await getPatientsList({ doctor_id: id });
    //   const res = await getPatientsByDoctorID({ doctor_id: id })
    //   setPatientsList(res)
    //   setPatientsFilterList(res)
    //   setTab(tabs[1])
    // }
    // let isOpinionAlreadyGiven = false;

    const handleOpenPopupClick = async(item) => {
      //  Mark Data as Viewed
      // const isViewed = await markDataAsViewed(item.id)
      // console.log(isViewed,"isViewed")

      // Check whether Opinon is already given or not.
      // console.log(item,"i am in ")
      const {lung_audio,patient_health,patient} = item
      const OpinionData = await isOpinionGiven({ patient_id:patient.id, lung_audio_id: lung_audio[0]?.id, patient_health_id:patient_health[0]?.id})
     
      console.log(OpinionData,"OpinionData")
      const isalreday = OpinionData.DataAndOpinion[0].DoctorOpinion
      let final_lung_audio 
      console.log("isAlreadyLength" , isalreday);
      if (isalreday.length>0)
      {
        const opinion = isalreday[isalreday.length-1]
        // console.log(opinion,"opinion")
        // const lung_audio_data = {opinion.p0_tag,
        //    opinion.p1_tag,
        //   opinion.p2_tag,opinion.p3_tag, opinion.p4_tag,   opinion.p5_tag,opinion.p6_tag,opinion.p7_tag,opinion.p8_tag,opinion.p9_tag,opinion.p10_tag,opinion.p11_tag,opinion.p12_tag,   } 
        const lung_audio_data = {
          p0_tag: opinion.p0_tag,
          p1_tag: opinion.p1_tag,
          p2_tag: opinion.p2_tag,
          p3_tag: opinion.p3_tag,
          p4_tag: opinion.p4_tag,
          p5_tag: opinion.p5_tag,
          p6_tag: opinion.p6_tag,
          p7_tag: opinion.p7_tag,
          p8_tag: opinion.p8_tag,
          p9_tag: opinion.p9_tag,
          p10_tag: opinion.p10_tag,
          p11_tag: opinion.p11_tag,
          p12_tag: opinion.p12_tag
        };
        // console.log(lung_audio_data,"lung_audiodata")
        final_lung_audio = {...lung_audio[0],...lung_audio_data}
        // console.log(lung_audio[0],final_lung_audio)
        setIsOpinionAlreadyGiven(true);
      }
      else{
        final_lung_audio = {...lung_audio[0]}

      }
      // console.log(OpinionData.DataAndOpinion[0].DoctorOpinion,"isalready")
      // const reportData =  {...item,lung_audio: lung_audio[0],patienthealthdata:patient_health[0]}
      const reportData =  {...item,lung_audio: final_lung_audio,patienthealthdata:patient_health[0]}

      // console.log(reportData, "this is what is am sending in popup2")
      setOpenShareData(reportData)
      // const res = await ViewFullReport(item)
      // console.log(res,"ye badiya hai guru ")
      // if(res===false) {return}
      // setReport(res)
      // when the popup is shown, we want a fixed background body
      // document.body.style.position='fixed'
      // document.body.style.top=`${window.scrollY}px`
      // console.log(window.scrollY,'scrolll wala hai')
  
      setShowPopup(true)
      // const isViewed = await markDataAsViewed(item.id)
      // console.log(isViewed,"isViewed")

     
    }
  
    const handleClosePopupClick = () => { 
      // scrollY = document.body.style.top;
      // console.log(scrollY,' ye close hone par scroll')
      // document.body.style.position = ''
      // document.body.style.top = ''
      // window.scrollTo(0,parseInt(scrollY||'0')*-1);
  
      setShowPopup(false)
    
    }
  return (
    <>
    {showPopup && (
        <Popup2
          doctorsList={[]}
          display={handleClosePopupClick}
          report={openShareData}
          isOpinionAlreadyGiven ={isOpinionAlreadyGiven}
          is_admin = {is_admin}
          is_doctor = {is_doctor}
        />
           )}
     <div className="w-screen min-h-screen  md:px-16 md:py-8">

    
    <div className="flex justify-between items-center">
          <h3 className="text-3xl font-medium text-green-1 text-center border-b-4 pb-2 border-green-2">
            <span className="text-green-2">LungX</span> Doctor Panel
          </h3>
          <ButtonPrimary
            text={'Logout'}
            icon={<FiLogOut />}
            handleClick={handleLogoutClick}
          />
        </div>
        {/* <h3 className="text-3xl font-medium text-green-1 text-center border-b-4 pb-2 border-green-2"> */}
        <h3 className="text-3xl font-medium text-green-1 text-left border-b-4 pb-2 border-green-2">
            <span className="text-green-2">Shared Data </span> Reports
          </h3>
          <>
            {shareData?.length ? (
              <table className="min-w-full divide-y divide-green-3">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">S.No.</th>
                    <th className="py-3 px-4 text-left">SharedID</th>
                    <th className="py-3 px-4 text-left">Doctor's Name</th>
                    <th className="py-3 px-4 text-left">Patient's Name</th>
                    <th className="py-3 px-4 text-left">Patient Type</th>
                    <th className="py-3 px-4 text-left">Session</th>
                    <th className="py-3 px-4 text-left">Created At</th>
                    <th className="py-3 px-4 text-left">Shared At</th>
                    {/* <th className="py-3 px-4 text-left">Hospital</th> */}
                    <th className="py-3 px-4 text-left"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {shareData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <td className="py-3 px-4 text-left">{index + 1}</td>
                      <td className="py-3 px-4 text-left">{item.id}</td>
                      <td className="py-3 px-4 text-left">
                        {item.patient.doctor_name}
                      </td>
                      <td className="py-3 px-4 text-left">{item.patient.patient_name}</td>
                      <td className="py-3 px-4 text-left">{item.patient.in_patient === true
                          ? 'In Patient'
                          : item.patient.out_patient === true
                          ? 'Out Patient'
                          : 'Patient Type is Not mentioned'}</td>

                      <td className="py-3 px-4 text-left">{item.patient_health[0].session}</td>
                      <td className="py-3 px-4 text-left">{new Date(item.patient_health[0].created_at).toLocaleDateString()}</td>
                          <td className="py-3 px-4 text-left">{new Date(item.created_at).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-left">
                        <button
                          onClick={()=>handleOpenPopupClick(item)}
                          className="text-green-1 hover:underline"
                        >
                          View Full Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-xl text-gray-400 text-center">
                No Data found
              </div>
            )}
          </>
    </div>
    </>
  )
}

export default DoctorDashboard