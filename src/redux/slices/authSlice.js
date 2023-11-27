import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  userInfo: {},
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false
      state.token = null
      state.userInfo = {}
    },
    login: (state, { payload }) => {
      state.loading = false
      state.token = payload.token
      state.userInfo = { name: payload.name, id: payload.id }
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
