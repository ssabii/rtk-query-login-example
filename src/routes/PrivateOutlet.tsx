import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from '../store/hooks'
import { selectAuth } from '../store/auth'
import { PrivateState } from '.'

const PrivateOutlet = () => {
  const { pathname } = useLocation()
  const { isLoggedIn } = useAppSelector(selectAuth)
  const privateState: PrivateState = {
    from: pathname,
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" state={privateState} />
}

export default PrivateOutlet
