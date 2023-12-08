import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
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
        const token = res.data.token
        localStorage.setItem('jwtToken', token)
        const results = {
          token
        }

        dispatch(login(results))
        console.log(token, 'THE TOKEN IS HERE AMIGOS')
      })
      .catch(function (err) {
        console.log('some error occured', err)
      })
  } catch (error) {
    console.log(error)
  }
}
