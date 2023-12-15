import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login } from '../slices/authSlice'

export const handleLogin = (email, password) => async (dispatch, getState) => {
  //End Point
  const endPoint = process.env.REACT_APP_DEV_URL
  try {
    const payload = {
      email,
      password,
    }
    Axios.post(endPoint + 'login/', {
      payload,
    })
      .then(function (res) {
        if (res.status == 200) {
          if (res.data['token']) {
            const token = res.data.token
            localStorage.setItem('jwtToken', token)
            const results = {
              token,
            }
            dispatch(login(results))
            // toast.info('Login Successfully...', {
            //   position: toast.POSITION.TOP_RIGHT,
            // })
          } else if (res.data['Validate Email']) {
            toast.error('Enter a Valid Email...', {
              position: toast.POSITION.TOP_RIGHT,
            })
          } else if (res.data['Empty Password']) {
            toast.error('Enter a Your Password...', {
              position: toast.POSITION.TOP_RIGHT,
            })
          } else if (res.data['no such Account in the DB']) {
            toast.error('Invalid Account, Try Again...', {
              position: toast.POSITION.TOP_RIGHT,
            })
          } else if (res.data['Wrong Password']) {
            toast.error('Oops! Wrong Password...', {
              position: toast.POSITION.TOP_RIGHT,
            })
          }
        } else {
          toast.error('Login failed. Try Again...', {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
      })
      .catch(function (err) {
        console.log('some error occured', err)
      })
  } catch (error) {
    console.log(error)
  }
}
