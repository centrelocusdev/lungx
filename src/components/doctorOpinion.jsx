import React from 'react'
import style from '../../public/style/popup2.module.css';

const DoctorOpinion = ({doctor_opinion , setShowDoctorOpinionTable, showDoctorOpinionTable}) => {
  return (
    <div className={`${style.doctorOpinion} ${showDoctorOpinionTable && style.display}`}>
                      {/* Anterior Data Table */}
                     <div className="flex flex-col gap-5">
                     <p className='text-2xl text-theme-primary text-center  font-semibold text-green-1'>Doctors Opinion on Anterior</p>
                      <table className={style.doctorOpinionTable} >
                        <tr>
                          <th>Doctor's Name</th>
                          <th>P0 Tag</th>
                          <th>P1 Tag</th>
                          <th>P2 Tag</th>
                          <th>P3 Tag</th>
                          <th>P4 Tag</th>
                          <th>P5 Tag</th>
                          <th>P6 Tag</th>

                        </tr>
                        {doctor_opinion.map((item)=>{
                          return(
                            <tr>
                            <td>{item.doctor_name}</td>
                            <td>{item.p0_tag}</td>
                            <td>{item.p1_tag}</td>
                            <td>{item.p2_tag}</td>
                            <td>{item.p3_tag}</td>
                            <td>{item.p4_tag}</td>
                            <td>{item.p5_tag}</td>
                            <td>{item.p6_tag}</td>
                        </tr>
                          )
                        })}
                        
                      </table>
                     </div>
                      {/* Posterior Data Table */}
                      <div className="flex flex-col gap-5">
                      <p className='text-2xl text-theme-primary text-center  font-semibold text-green-1'>Doctors Opinion on Posterior</p>
                      <table className={style.doctorOpinionTable} >
                        <tr>
                        <th>Doctor's Name</th>
                          <th>P7 Tag</th>
                          <th>P8 Tag</th>
                          <th>P9 Tag</th>
                          <th>P10 Tag</th>
                          <th>P11 Tag</th>
                          <th>P12 Tag</th>
                        </tr>
                        {doctor_opinion.map((item)=>{
                          return(
                            <tr>
                            <td>{item.doctor_name}</td>
                            <td>{item.p7_tag}</td>
                            <td>{item.p8_tag}</td>
                            <td>{item.p9_tag}</td>
                            <td>{item.p10_tag}</td>
                            <td>{item.p11_tag}</td>
                            <td>{item.p12_tag}</td>
                        </tr>
                          )
                        })}
                      </table>
                      </div>
                      {/* <button
                          onClick={()=> {setShowDoctorOpinionTable(false)}}
                          className="text-gray-500 text-center w-full underline hover:text-green-1"
                        >
                          Close
                        </button> */}
                    </div>
  )
}

export default DoctorOpinion