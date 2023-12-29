import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { selectToken } from '../../redux/slices/authSlice'
import { jwtDecode } from 'jwt-decode'
import {
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CFormCheck,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormSelect,
  CSpinner,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilOptions,
  cilSearch,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Users = () => {
  const URL = process.env.REACT_APP_DEV_URL
  const token = useSelector(selectToken)
  const [decodedToken, setDecodedToken] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [singleUsers, setSingleUsers] = useState([])
  const [visible, setVisible] = useState(false)
  const [selectedUserGuid, setSelectedUserGuid] = useState(null)

  //Get Token
  useEffect(() => {
    // ----- Get Token -----
    if (token) {
      const decoded = jwtDecode(token)
      setDecodedToken(decoded)
    }
  }, [token])

  const getAllUsers = () => {
    Axios.post(URL + 'users/all/', null, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const data = res.data
        //const dataToArray = Object.values(data);
        setAllUsers(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  const getSingleUsers = (userGuid) => {
    Axios.post(
      URL + 'users/single/',
      { userGuid: userGuid },
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
        setSingleUsers(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  useEffect(() => {
    getAllUsers()
    getSingleUsers()
  }, [])
  const customCSSVariables = {
    '--cui-dropdown-link-active-color': 'dark',
  }

  return (
    <>
      {/*----- Launch Modal Here -----*/}
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        {/* <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">
                        <div className="d-flex justify-content-center">
                            <h3>User Info</h3>
                        </div>
                    </CModalTitle>
                </CModalHeader> */}
        <CModalBody>
          <CListGroup>
            {singleUsers.length > 0 && (
              <>
                <CListGroupItem active style={{ backgroundColor: '#303C54' }}>
                  {' '}
                  User Information{' '}
                </CListGroupItem>
                <CListGroupItem>
                  <span>
                    <strong>First Name:</strong>
                  </span>{' '}
                  {singleUsers[0].firstname}{' '}
                </CListGroupItem>
                <CListGroupItem>
                  <span>
                    <strong>Last Name:</strong>
                  </span>{' '}
                  {singleUsers[0].lastname}
                </CListGroupItem>
                <CListGroupItem>
                  <span>
                    <strong>User Email:</strong>
                  </span>{' '}
                  {singleUsers[0].email}
                </CListGroupItem>
                <CListGroupItem>
                  <span>
                    <strong>Registration Date:</strong>
                  </span>{' '}
                  {singleUsers[0]?.created_at ? singleUsers[0].created_at.split(' ')[0] : ''}
                </CListGroupItem>
              </>
            )}
          </CListGroup>
        </CModalBody>
      </CModal>
      <CRow>
        <CCol xs>
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-center">
                <h2>LIST ALL USERS</h2>
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">First Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Last Name </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Registered Date</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allUsers.length > 0 ? (
                    allUsers.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        {/* <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell> */}

                        <CTableDataCell className="text-center">
                          <CIcon size="xl" icon={item.firstname} title="" />
                          {item.firstname}
                        </CTableDataCell>

                        <CTableDataCell className="text-center">
                          <CIcon size="xl" icon={item.lastname} title="" />
                          {item.lastname}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CIcon size="xl" icon={item.email} title="" />
                          {item.email}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CIcon size="xl" icon={item.created_at} title="" />
                          {item.created_at}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CDropdown alignment="end" style={customCSSVariables}>
                            <CDropdownToggle color="dark" caret={false} className="p-0">
                              <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                            </CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem className="text-center">
                                <Icon
                                  onClick={() => {
                                    setVisible(!visible)
                                    getSingleUsers(item.user_guid)
                                  }}
                                  icon="mdi:account-eye-outline"
                                  style={{ fontSize: '24px', color: '#f9b115' }}
                                />
                              </CDropdownItem>
                              <CDropdownItem className="text-center">
                                <Link to={`/usAbsoDefCoEd/${item.user_guid}`}>
                                  <span>
                                    <Icon
                                      icon="mdi:account-edit-outline"
                                      style={{ fontSize: '24px', color: '#f9b115' }}
                                    />
                                  </span>
                                </Link>
                              </CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                          {/* <Link to={`/usAbsoDefCoEd/${item.user_guid}`}>
                                                        <span>
                                                            <Icon
                                                                icon="mdi:account-minus-outline"
                                                                style={{ fontSize: '24px', color: '#e55353' }}
                                                            />
                                                        </span>
                                                    </Link> */}
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow v-for="item in tableItems" key={''}>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {/* <CIcon size="xl" icon={} /> */}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                        {'No Users yet....'}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                        {''}
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Users
