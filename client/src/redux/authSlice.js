import { createSlice } from '@reduxjs/toolkit'

const readStoredUser = () => {
  try {
    const rawUser = localStorage.getItem('auth_user')
    return rawUser ? JSON.parse(rawUser) : null
  } catch {
    return null
  }
}

const initialUser = readStoredUser()

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    isAuthenticated: Boolean(initialUser),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      localStorage.setItem('auth_user', JSON.stringify(action.payload))
    },
    logoutSuccess: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('auth_user')
    },
  },
})

export const { loginSuccess, logoutSuccess } = authSlice.actions
export default authSlice.reducer