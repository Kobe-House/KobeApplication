import { React } from 'react'
import {
    CToast,
    CToastHeader,
    CToastBody,
    CToastClose,
    CToaster
  } from '@coreui/react'

  export const showToast = (message, color = '#3C4B64', autohide = true, delay = 2000) => {
    const toaststyle = {
        backrgoundColor: color,
      }
    return (
      <CToast style={toaststyle} className="text-white align-items-center" autohide={autohide} delay={delay}>
        <div className="d-flex">
          <CToastBody>{message}</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
    );
  };
  