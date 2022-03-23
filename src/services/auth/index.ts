import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginRequest, LoginResponse } from './types'
import { setToken } from '../../store/auth'

export const api = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://reqres.in/api/',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (params) => ({
        url: 'login',
        method: 'POST',
        body: params,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((response) => {
            const { token } = response.data
            dispatch(setToken(token))
          })
          .catch(() => {
            dispatch(setToken(null))
          })
      },
    }),
  }),
})

export const { useLoginMutation } = api

export default api
