import './App.css';
import HomePage from './screens/HomePage';
import Header from './components/Header';
import LoginPage from './screens/LoginPage';
import UserProfile from './screens/UserProfile';
import { Routes, Route } from 'react-router-dom';
import UserProvider from './components/UserProvider';
import SearchContext from './context/SearchContext';
import { useState } from 'react';

function App() {
  const [searchData, setSearchData] = useState([]);

  return (
    <div>
      <Header />
      <UserProvider>
      <Routes>
        <Route path='/' element={
            <SearchContext.Provider value={{searchData:searchData, setSearchData:setSearchData}}>
              <HomePage/>
            </SearchContext.Provider>
        }/>
        <Route path='/profile' element={
            <UserProfile/>
        }/>
        <Route path='/login' element={
            <LoginPage/>
        }/>
      </Routes>
    </UserProvider>
    </div>
  );
}

export default App;
