import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './Page/Login';
import SignUp from './Page/SignUp';
import Dashboard from './Page/App/Dashboard';
import Quiz_me from './Page/App/Quiz_me';
import Note_A_Voice from './Page/App/Note_A_Voice';
import ChatBot from './Page/App/Chat/ChatBot';

function App() {
  return (
    <Routes>

      {/* This is the Authentication Page */}
      <Route path ="/"  element={<Login />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path ="/login"  element={<Login />} />
    
      {/* This is the Main Web Application Page */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/quiz_me" element={<Quiz_me />} />
      <Route path="/note-a-voice" element={<Note_A_Voice />} />


        {/* This part works with ChatBot */}
      <Route path="/chat_with_bayne" element={<ChatBot />} />
    </Routes>
  )
}

export default App
