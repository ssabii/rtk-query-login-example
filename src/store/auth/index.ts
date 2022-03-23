import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isLoggedIn: boolean
  token: string | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string | null>) => {
      state.isLoggedIn = payload !== null
      state.token = payload
    },
  },
})

export const { setToken } = slice.actions

export default slice.reducer
