import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { selectToken } from '../../redux/slices/authSlice'
import { jwtDecode } from 'jwt-decode'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilSettings, cilUser, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useDispatch } from 'react-redux'
import { logout } from 'src/redux/slices/authSlice'

const AppHeaderDropdown = () => {
  const DEV_URL = process.env.REACT_APP_DEV_URL
  const token = useSelector(selectToken)
  const [decodedToken, setDecodedToken] = useState(null)
  const [statData, setStatData] = useState({
    totalUsers: { Users: '0' },
  })
  //Get Token
  useEffect(() => {
    // Decode the JWT token
    if (token) {
      const decoded = jwtDecode(token)
      setDecodedToken(decoded)
    }
  }, [token])

  //Access specific fields
  const level = decodedToken?.level
  const userName = decodedToken?.userName
  const email = decodedToken?.email
  const guid = decodedToken?.guid

  const dispatch = useDispatch()
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  //---- GEt Statistics ---
  useEffect(() => {
    Axios.get(DEV_URL + 'scraping/statistics/', {
      guid: guid,
    }).then((res) => {
      const data = res.data

      try {
        setStatData(data)
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    })
  }, [])
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Username</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          {userName}
          {/* <CBadge color="info" className="ms-2">
            
          </CBadge> */}
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilPlus} className="me-2" />
          Users
          <CBadge color="success" className="ms-2">
            {statData.Users && statData.Users.totalUsers}
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownDivider />
        <CDropdownItem
          onClick={() => {
            localStorage.removeItem('jwt')
            dispatch(logout())
          }}
          href="#"
        >
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}
export default AppHeaderDropdown
