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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
    isAuthenticated: Boolean(initialUser),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      localStorage.setItem('auth_user', JSON.stringify(action.payload))
    },
    logoutUser: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('auth_user')
    },
  },
})

export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer