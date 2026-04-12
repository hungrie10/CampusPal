import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './Page/Login';
import SignUp from './Page/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign_up" element={<SignUp />} />
    </Routes>
  )
}

export default App
