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
  const endPoint = process.env.REACT_APP_DEV_URL;

  //State Variables
  const [registrationData, setRegistrationData] = useState({});

  //State variables Storing Data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordComfirm: '',
  });

  //State Variable for Validation
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordComfirm: '',
  });

//Get input values and populate into formData
const handleChange = (e)=> {
  //Desctruring e.target
  const {name, value} = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
}

// //Validation Handling
  const validateForm = () => {
  let errors = {};
  let isValid = true;
  const namePattern = /^[A-Za-z\s]+$/;

  //First Name
  if(!formData.firstName.trim()){
    errors.firstName = 'First name is required *';
    isValid = false;
  }else if(!namePattern.test(formData.firstName)){
    errors.firstName = 'First name should contain only letters and spaces';
    isValid = false;
  }

  //Last Name
  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
    isValid = false;
  } else if (!namePattern.test(formData.lastName)) {
    errors.lastName = 'Last name should contain only letters and spaces';
    isValid = false;
  }
  //Email
  if (formData.email !== undefined && !formData.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
    errors.email = 'Invalid email format';
    isValid = false;
  }

  //Username
  if (formData.username !== undefined && !formData.username.trim()) {
    errors.username = 'Username is required';
    isValid = false;
  }
  //Passowrd 
  if ( formData.password !== undefined && !formData.password.trim()) {
    errors.password = 'Password is required';
    isValid = false;
  }
  //Confirmed Pwd
  if (formData.passwordComfirm !== undefined && !formData.passwordComfirm.trim()) {
    errors.passwordComfirm = 'Password is required';
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
}

//Handle SUbmit fucntionality
const handleSubmit = (e) => {
  e.preventDefault();

  //Validation must be TRUE fiest
  if(validateForm()) {
    Axios.post(endPoint + '/database/query/register/', formData)
    .then((res) => {
      alert("The Registration is Done!");
    })
    .catch((error) => {
      console.log('Registration', error);
    });
  }

}

//Fetching the output
useEffect(() => {
  Axios.get(endPoint + 'register/')
  .then( res => res.data)
  .then((data) => {
    setRegistrationData(data);
    console.log(registrationData);
  })
  .catch( error =>  {
    console.log('Error', error);
  }, []);

})
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1></h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUserFollow} />
                      </CInputGroupText>
                      <CFormInput 
                      name="firstName"
                      placeholder="First name" 
                      autoComplete="first name" 
                      value={formData.firstName}
                      onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUserFollow} />
                      </CInputGroupText>
                      <CFormInput 
                      name="lastName"
                      placeholder="Last name" 
                      autoComplete="lastname"
                      value={formData.lastName}
                      onChange={handleChange}
                       />
                    </CInputGroup>
                      <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput 
                      name="email"
                      placeholder="Email" 
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                       />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                      name="username"
                      placeholder="Username" 
                      autoComplete="username"
                      value={formData.username}
                      onChange={handleChange}
                       />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockUnlocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockUnlocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="passwordComfirm"
                        type="password"
                        placeholder="Comfirm Password"
                        autoComplete="confirm-password"
                        value={formData.passwordComfirm}
                        onChange={handleChange}
                      />
                    </CInputGroup> 
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="success" style={{ color: 'white' }} className="px-4">
                          Register
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/Login">Have an Account?</Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-success py-5" style={{ width: '34%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Kobe&apos;s App</h2>
                    <p>
                      <br></br>
                      {/* <strong>Registration Form</strong> */}
                    </p>
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
