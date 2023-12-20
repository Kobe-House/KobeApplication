import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { selectToken } from '../../redux/slices/authSlice'
import { jwtDecode } from 'jwt-decode'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const UsAbsoDefCoEd = () => {
  const URL = process.env.REACT_APP_DEV_URL
  const { user } = useParams()
  const token = useSelector(selectToken)
  const [decodedToken, setDecodedToken] = useState(null)
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')

  //Get Token
  useEffect(() => {
    // ----- Get Token -----
    if (token) {
      const decoded = jwtDecode(token)
      setDecodedToken(decoded)
    }
  }, [token])
  // ----- UPDATE USER INFO -----
  const updateUserInfo = (e) => {
    e.preventDefault()
    Axios.post(
      URL + 'users/update/',
      { userGuid: user, firstName: fname, lastName: lname, email: email },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => {
        if (res.status === 200) {
          if (res.data['Ok']) {
            toast.success('Updated....', {
              position: toast.POSITION.TOP_RIGHT,
            })
            setTimeout(() => {
              window.location.href = '/#/users/'
            }, 2000)
          }
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // ----- GET SINGLE USER INFO -----
  const getSingleUsers = () => {
    Axios.post(
      URL + 'users/single/',
      { userGuid: user },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => {
        const data = res.data
        setFname(data[0].firstname)
        setLname(data[0].lastname)
        setEmail(data[0].email)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    getSingleUsers()
  }, [])

  return (
    <>
      <ToastContainer />
      <CRow>
        <CCol xs>
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-center">
                <h4>Edit User Information</h4>
              </div>
            </CCardHeader>

            <CCardBody>
              <form onSubmit={updateUserInfo}>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputFname" className="col-sm-2 col-form-label">
                    First Name
                  </CFormLabel>
                  <CCol sm={5}>
                    <CFormInput
                      type="text"
                      id="inputFname"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputLname" className="col-sm-2 col-form-label">
                    Last Name
                  </CFormLabel>
                  <CCol sm={5}>
                    <CFormInput
                      type="text"
                      id="inputLname"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                    Email
                  </CFormLabel>
                  <CCol sm={5}>
                    <CFormInput
                      type="email"
                      id="inputEmail3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CButton type="submit">Update User Info</CButton>
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default UsAbsoDefCoEd
