import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const api = 'https://lung.thedelvierypointe.com/api'

function capitalizeWords(inputString) {
  return inputString.replace(/\b\w/g, (char) => char.toLocaleUpperCase())
}

export const addDoctorAdmin = async (formData) => {
  try {
    console.log(
      formData.email,
      formData.password,
      formData.confirm_password,
      formData.first_name,
      formData.last_name,
      formData.mobile
    )
    if (
      !formData.email ||
      !formData.password ||
      !formData.confirm_password ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.mobile
    ) {
      toast.error('All Fields are compulsory, Please Enter all the fields')
      return
    } else if (formData.password !== formData.confirm_password) {
      toast.error('Passwords Does Not Match')
      return
    }
    const res = await axios.post(`${api}/register/doctor/admin/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
        'content-type': 'multipart/form-data',
      },
    })
    toast.success('New Doctor has been added')
    return res.data
    console.log(res.data)
  } catch (err) {
    // console.log(err)
    // console.log(err.response.data)
    // console.log(err.response.data.email[0])
    if (err.response.status === 400) {
      // for email
      err.response.data?.email?.[0] &&
        toast.error(capitalizeWords(`${err.response.data.email[0]}`))
      // for password
      err.response.data?.non_field_errors?.[0] &&
        err.response.data.non_field_errors.forEach((message) => {
          toast.error(capitalizeWords(`${message}`))
          // console.log(message)
        })
    } else {
      toast.error(`Something Happended, Please Try Again api `)
    }
    // err.response.data?.email[0] && toast.error('The Provided Email is alreday Registered')
    // err.response.data?.text[0] && toast.error('Please enter description')
    return
  }
}

export const createDoctorByAdmin = async (formData) => {
  //   Endpoint Name: Doctor Registration By Admin
  // >>  URL: domain.com/api/register/doctor/admin/
  // FIELDS: email, password, confirm_password,
  // first_name, last_name, mobile
  // METHOD: POST
  try {
    const res = await axios.post(`${api}/register/doctor/admin/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
        'content-type': 'multipart/form-data',
      },
    })
    return res.data
  } catch (err) {
    toast.error(err.error)
    return false
  }
}

export const shareData = async (formData) => {
  try {
    // console.log(formData.email, formData.password,formData.confirm_password,formData.first_name,formData.last_name,formData.mobile)
    console.log(
      formData.doctor_id,
      formData.patient_id,
      formData.patient_health_ids,
      formData.lung_audio_ids
    )
    const res = await axios.put(`${api}/share-data/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
        'content-type': 'multipart/form-data',
      },
    })
    console.log(res.data)
    return res.data
  } catch (err) {
    console.log(err)
    console.log(err.response.data)
    console.log(err.response.data.email[0])
    err.response.data?.email[0] &&
      toast.error('The Provided Email is alreday Registered')
    // err.response.data?.text[0] && toast.error('Please enter description')
    return
  }
}

export const login = async (formData) => {
  try {
    const res = await axios.post(`${api}/login/`, formData)
    const user = "";
    if(res){
      Cookies.set('LungX-AT', res.data.access)
      Cookies.set('LungX-RT', res.data.refresh)
      toast.success('Logged in successfully')
      return res.data.user;
    }
    
  } catch (err) {
    toast.error(err.response.data.error)
    return false
  }
}

export const logout = async () => {
  try {
    await axios.post(
      `${api}/logout/`,
      {
        refresh_token: Cookies.get('LungX-RT'),
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
          'content-type': 'multipart/form-data',
        },
      }
    )

    Cookies.remove('LungX-AT')
    Cookies.remove('LungX-RT')
    toast.success('Logged out successfully')
    return true
  } catch (err) {
    toast.error(err.error)
    return false
  }
}

export const getDoctorsList = async () => {
  try {
    const res = await axios.get(`${api}/admin/doctor/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
        'content-type': 'multipart/form-data',
      },
    })

    return res.data
  } catch (err) {
    toast.error(err.error)
    return false
  }
}

export const viewSharedData = async () => {
  try {
    const res = await axios.get(`${api}/view-shared-data/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
        'content-type': 'multipart/form-data',
      },
    })
    //  console.log(res.data,"inviewSharedData")
    return res.data
  } catch (err) {
    toast.error(err.error)
    return false
  }
}

export const isOpinionGiven = async (formData) => {
  try {
    const res = await axios.post(`${api}/admin/doctor_opinion/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
        'content-type': 'multipart/form-data',
      },
    })
    console.log(res.data,"isOpinionGiven")
    return res.data
  } catch (err) {
    toast.error(err.error)
    return false
  }
}

export const markDataAsViewed = async(shareID) => {
  console.log(shareID,"markdata",`${api}/mark-data-as-viewed/${shareID}/`)
  try {
    const res = await axios.patch(`${api}/mark-data-as-viewed/${shareID}/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
        // 'content-type': 'multipart/form-data',
      },
    })
     console.log(res.data,"markDataAsViewed")
    return res.data
  } catch (err) {
    toast.error(err.error)
    return false
  }
}

export const doctorOpinion = async (oldformData) => {
  console.log(oldformData,"opinionformData")
  const formData = {...oldformData,...oldformData.formData}
  console.log(formData,"formData")
  console
  try {
    const res = await axios.put(`${api}/admin/doctor_opinion/`, formData,{
      headers: {
        Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
        'content-type': 'multipart/form-data',
      },
    })
     console.log(res,res.data,"doctorOpinion")
    toast.success("Your Opinions Has been saved")
    return res.data
  } catch (err) {
    toast.error(err.error)
    return false
  }
}

export const getPatientsByDoctorID = async ({ doctor_id }) => {
  try {
    const res = await axios.get(`${api}/admin/patients/${doctor_id}/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
      },
    })
    return res.data
  } catch (err) {
    toast.error(err.error)
    return false
  }
}

export const getPatientsList = async (formData) => {
  try {
    const res = await axios.post(`${api}/patients/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
      },
    })

    return res.data
  } catch (err) {
    toast.error(err.error)
    return false
  }
}

export const getReportsList = async ({
  patient_id: patient_id,
  doctor_id: doctor_id,
}) => {
  console.log(patient_id, doctor_id, 'checking')
  const formData = { id:patient_id }
  try {
    const res = await axios.post(
      `${api}/admin/patients/${doctor_id}/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
        },
      }
    )
    console.log(res.data, ' in new get patient healthreports of particular patient ')
    return res.data
  } catch (err) {
    toast.error(err.error)
    return false
  }
}

export const ViewFullReport = async ({
  patient,created_at,session
}) => {
  let date = new Date(created_at).toLocaleDateString()
  const [month, day, year] = date.split('/')
  // console.log(month,day,year)
  date = `${year}-${month}-${day}`
  console.log(date,session,patient)
  const formData = { patient_id: patient, session: session, created_at:date }
  try {
    const res = await axios.post(
      `${api}/patients/session/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
        },
      }
    )
    console.log(res.data, ' in response of viewdata ')
    return res.data
  } catch (err) {
    console.log(err)
    toast.error(err?.response?.data?.error)
    return false
  }
}

// export const getReportsList = async (formData) => {
//   try {
//     const res = await axios.post(`${api}/lung_audio/`, formData, {
//       headers: {
//         Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
//       },
//     })

//     return res.data
//   } catch (err) {
//     toast.error(err.error)
//     return false
//   }
// }

export const updatePatientHealthReport = async (doctorId, formData) => {
  try {
    if (Object.keys(formData).length <= 1) {
      toast.error('Please enter a value')
      return
    }
    console.log(doctorId,formData,"In UpdatePatientHealthData")
    const res = await axios.patch(`${api}/admin/patients/${doctorId}/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
      },
    })
    res.status == 200 && toast.success('Patient Health Report updated successfuly')
    return res.data
  } catch (err) {
    toast.error(err.error)
    return false
  }
}
export const updateLungAudioReport = async (formData) => {
  try {
    // if (Object.keys(formData).length <= 1) {
    //   toast.error('Please enter a value')
    //   return
    // }

    console.log(formData,"lungformData")
    const res = await axios.patch(`${api}/lung_audio/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get('LungX-AT')}`,
      },
    })
    console.log(res, 'updated lung audio sucessfully')
    res.status == 200 && toast.success('Lung Audio Report updated successfuly')
    return res.data
  } catch (err) {
    toast.error(err.error)
    return false
  }
}
