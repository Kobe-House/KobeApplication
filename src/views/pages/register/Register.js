import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilLockLocked,
  cilUser,
  cilEnvelopeClosed,
  cilLockUnlocked,
  cilUserFollow,
} from '@coreui/icons'

const Register = () => {
  //End Point
  const endPoint = process.env.REACT_APP_DEV_URL

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')
  const [confirmPassWord, setConfirmPassWord] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // alert("CLICKED!");

      let res = await Axios.post(endPoint + 'register/', {
        firstName,
        lastName,
        email,
        userName,
        passWord,
        confirmPassWord,
      })

      if (res.status === 200) {
        console.log(res.data) // Display a success message
        // Redirect to another page or perform additional actions if needed
      } else {
        alert('Registration failed. Please try again.') // Display an error message
      }
    } catch (err) {
      console.log('Error:', err)
      alert('Registration failed. Please try again.') // Display an error message
    }
  }

  return (
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
                          color="success"
                          style={{ color: 'white' }}
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
              <CCard className="text-white bg-success py-5" style={{ width: '34%' }}>
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
  )
}

export default Register
