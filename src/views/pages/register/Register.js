import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CCardGroup,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastHeader,
  CToastBody,
  CToastClose,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilLockLocked,
  cilUser,
  cilEnvelopeClosed,
  cilLockUnlocked,
  cilUserFollow,
} from '@coreui/icons'
import { showToast } from 'src/views/Toast'

const Register = () => {
  //End Point
  const endPoint = process.env.REACT_APP_DEV_URL

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')
  const [confirmPassWord, setConfirmPassWord] = useState('')
  let [toastMsg, setToastMsg] = useState('')

  //-----Toast------
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const successToast = showToast('Registered Successfully', 'success')
  let failedToast = showToast(toastMsg, 'danger')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await Axios.post(endPoint + 'register/', {
        firstName,
        lastName,
        email,
        userName,
        passWord,
        confirmPassWord,
      })

      if (res.status === 200) {
        if (res.data['Success Registration']) {
          window.location.href = '/#/login/'
        }
        if (res.data['Password Mismatch']) {
          alert('Password mismatch. Please check your passwords')
        }
        if (res.data['Email Exist']) {
          alert('Email already exists. Please use a different email.')
        }
      } else {
        alert('Registration failed. Please try again.')
      }
    } catch (err) {
      console.log('Error:', err)
      alert('Registration failed. Please try again.')
    }
  }

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                      <h1>Registration Form</h1>
                      <p className="text-medium-emphasis">Sign Up for an account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUserFollow} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                          placeholder="First name"
                          autoComplete="firstname"
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUserFollow} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Last name"
                          autoComplete="lastname"
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilEnvelopeClosed} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          autoComplete="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          autoComplete="username"
                          onChange={(e) => setUserName(e.target.value)}
                          value={userName}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockUnlocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="new-password"
                          onChange={(e) => setPassWord(e.target.value)}
                          value={passWord}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockUnlocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Confirm Password"
                          autoComplete="new-password"
                          onChange={(e) => setConfirmPassWord(e.target.value)}
                          value={confirmPassWord}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            type="submit"
                            style={{ color: 'white', backgroundColor: '#303C54' }}
                            className="px-4"
                          >
                            Register
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <Link to="/login">Already have an account?</Link>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white py-5"
                  style={{ width: '34%', backgroundColor: '#303C54' }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Kobe&apos;s App</h2>
                      <p>{/* Additional information or branding */}</p>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Register
