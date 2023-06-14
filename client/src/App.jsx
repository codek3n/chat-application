import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Chat from './pages/chat/Chat';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import './app.scss';

const App = () => {

  const { user } = useContext(AuthContext);
  return (
    <ChatContextProvider user={user}>
      <div className='app'>
        <Routes>
          <Route path='/' element={user ? <Chat /> : <Login />} />
          <Route path='/register' element={user ? <Chat /> : <Register />} />
          <Route path='/login' element={user ? <Chat /> : <Login />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </ChatContextProvider>
  )
}

export default App