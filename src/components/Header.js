import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';


const Header = () => {
  return (
    <div>
      <a href="/">
        <img className='logo' src={logo} align="left"/>
      </a>

      <div className='header-main'>
        <Link className='profile-btn' to='/profile'>Profile</Link>
        <Link className='login-btn' to='/login'>Login</Link>
      </div>
    </div>
  )
}

export default Header;