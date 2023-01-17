import React from 'react';
import Register from '../components/Register';
import Login from '../components/Login';

const LoginPage = () => {

  return (
    <main>
        <div className='register-container'>
          <Login />
        </div>

        <div className='register-container'>
          <Register />
        </div>
    </main>
  )
}

export default LoginPage;