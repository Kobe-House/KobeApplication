import { React } from 'react'
import { CToast, CToastHeader, CToastBody, CToastClose, CToaster } from '@coreui/react'

export const showToast = (message, color = 'dark', autohide = true, delay = 2000) => {
  return (
    <CToast
      color={color}
      className="text-white align-items-center"
      autohide={autohide}
      delay={delay}
    >
      <div className="d-flex">
        <CToastBody>{message}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )
}
