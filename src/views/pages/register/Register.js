import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
  CListGroupItem,
  CListGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilLockLocked,
  cilUser,
  cilLockUnlocked,
  cilToggleOff,
  cilToggleOn,
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
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [invalidPwdMsg, setInvalidPwdMsg] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2)
  }
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
          toast.success('Thank you for Registering...', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setTimeout(() => {
            window.location.href = '/#/login/'
          }, 2000)
        }
        if (res.data['Password Mismatch']) {
          toast.error('Ooop! Password Mismatch...', {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
        if (res.data['Email Exist']) {
          toast.info('Email Already Exist...', {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
        if (res.data['Valid Email']) {
          toast.error('Enter a Valid Email...', {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
        if (res.data['InvalidPassword']) {
          toast.error('Invalid Password Policy', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setInvalidPwdMsg(true)
        }
      } else {
        console.log(res.text)
      }
    } catch (err) {
      console.log('Error:', err)
      toast.warning('Registration failed. Please try again....', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  return (
    <>
      {/*Show Toast*/}
      <ToastContainer />
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
                          <CIcon icon={cilLockLocked} />
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
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type={showPassword2 ? 'text' : 'password'}
                          placeholder="Password"
                          autoComplete="new-password"
                          onChange={(e) => setPassWord(e.target.value)}
                          value={passWord}
                        />
                        <CInputGroupText>
                          <CIcon
                            icon={showPassword2 ? cilToggleOn : cilToggleOff}
                            onClick={togglePasswordVisibility2}
                          />
                        </CInputGroupText>
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockUnlocked} />
                        </CInputGroupText>
                        <CFormInput
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm Password"
                          autoComplete="new-password"
                          onChange={(e) => setConfirmPassWord(e.target.value)}
                          value={confirmPassWord}
                        />
                        <CInputGroupText>
                          <CIcon
                            icon={showPassword ? cilToggleOn : cilToggleOff}
                            onClick={togglePasswordVisibility}
                          />
                        </CInputGroupText>
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
                      <h2>KOBE APP</h2>
                      <p>
                        {invalidPwdMsg && (
                          <CCard style={{ width: '22rem' }}>
                            <CListGroup flush>
                              <CListGroupItem
                                style={{
                                  backgroundColor: '#303C54',
                                  border: 'none',
                                  color: 'white',
                                }}
                              >
                                Password must at least have:
                              </CListGroupItem>
                              <CListGroupItem
                                style={{ backgroundColor: 'white', color: '#303C54' }}
                              >
                                8 characters
                              </CListGroupItem>
                              <CListGroupItem
                                style={{ backgroundColor: 'white', color: '#303C54' }}
                              >
                                a special character
                              </CListGroupItem>
                              <CListGroupItem
                                style={{ backgroundColor: 'white', color: '#303C54' }}
                              >
                                an uppercase letter
                              </CListGroupItem>
                              <CListGroupItem
                                style={{ backgroundColor: 'white', color: '#303C54' }}
                              >
                                a number
                              </CListGroupItem>
                            </CListGroup>
                          </CCard>
                        )}
                      </p>
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
