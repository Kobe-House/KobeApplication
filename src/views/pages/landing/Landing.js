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

const Landing = () => {
    return (
        <>
            <div>HELLO</div>
        </>
    )
}

export default Landing
