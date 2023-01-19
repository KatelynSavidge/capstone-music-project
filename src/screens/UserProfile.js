import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import useUser from '../hooks/useUser';

const UserProfile = () => {
  const [ user ] = useUser();
  console.log(user)
  if (user == '') {
    return (
      <div>
        <h1>Login to see your profile.</h1>
      </div>
    )
  }
  return (
    <div>
      <h1>Welcome, {user}</h1>
    </div>
    
  )
}

export default UserProfile;