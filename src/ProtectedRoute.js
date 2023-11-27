import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom/dist'

export { PrivateRoute }

const PrivateRoute = ({ isAllowed, children }) => {
  const { token } = useSelector((state) => state.auth)
  console.log(token, 'KKOKOKO')

  if (!isAllowed) {
    return <Navigate to={'/login'} />
  }

  return token ? children : <Navigate to={'/login'} />
}

PrivateRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}
