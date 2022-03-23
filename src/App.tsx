import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import Home from './pages/Home'

import Login from './pages/Login'
import PrivateOutlet from './routes/PrivateOutlet'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<PrivateOutlet />}>
          <Route path="" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
