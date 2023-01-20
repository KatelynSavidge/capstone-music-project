import { useState } from 'react';
import UserContext from '../context/UserContext';

function UserProvider({ children }) {
    const [userContext, setUserContext] = useState()
  
    return (
      <UserContext.Provider value={{ userContext, setUserContext }}>
        {children}
      </UserContext.Provider>
    );
  }

  export default UserProvider