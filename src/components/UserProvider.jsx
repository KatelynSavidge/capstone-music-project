import { useState } from 'react';
import UserContext from '../context/UserContext';
import useUser from '../hooks/useUser';

function UserProvider({ children }) {
    const [userContext, setUserContext] = useUser();
  
    return (
      <UserContext.Provider value={{ userContext, setUserContext }}>
        {children}
      </UserContext.Provider>
    );
  }

  export default UserProvider