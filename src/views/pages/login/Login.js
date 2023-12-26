import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilLockUnlocked,
  cilUser,
  cilToggleOff,
  cilToggleOn,
  cilEnvelopeClosed,
} from '@coreui/icons'
import { useDispatch } from 'react-redux'
import { handleLogin } from 'src/redux/actions/authAction'

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [hasInput, setHasInput] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  //----- Check Whent o Show PWD -----
  const handlePwdChange = (e) => {
    const inputValue = e.target.value
    setPassword(inputValue)
    setHasInput(inputValue.length > 0)
  }
  return (
    <>
      <ToastContainer />
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1></h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilEnvelopeClosed} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          autoComplete="emai"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockUnlocked} />
                        </CInputGroupText>
                        <CFormInput
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          onChange={handlePwdChange}
                        />
                        {hasInput && (
                          <CInputGroupText>
                            <FontAwesomeIcon
                              onClick={togglePasswordVisibility}
                              icon={showPassword ? faEyeSlash : faEye}
                            />
                          </CInputGroupText>
                        )}
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            onClick={() => {
                              dispatch(handleLogin(email, password))
                            }}
                            style={{ color: 'white', backgroundColor: '#303C54' }}
                            className="px-4"
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <Link to="/Register">Don&apos;t Have an Account?</Link>
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
                        <br></br> SCRAPING<br></br>&<br></br>BULK LISTING
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

export default Login
