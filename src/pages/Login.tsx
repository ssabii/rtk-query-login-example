import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PrivateState } from '../routes'
import { useLoginMutation } from '../services/auth'
import { LoginRequest } from '../services/auth/types'

const Login = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const [form, setForm] = useState<LoginRequest>({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const [login, { isLoading }] = useLoginMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isEmpty = Object.values(form).some((value) => value === '')

    if (isEmpty) return

    await login(form)
      .unwrap()
      .then(() => {
        const privateState = state as PrivateState

        if (privateState) navigate(privateState.from)
        else navigate('/')
      })
      .catch((e) => {
        setError(e.data?.error)
      })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>email</p>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </label>
        <label>
          <p>password</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            onChange={handleChange}
          />
        </label>
        <div>
          <button type="submit" disabled={isLoading}>
            Login
          </button>
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  )
}

export default Login
