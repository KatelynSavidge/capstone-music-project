import './App.css';
import HomePage from './screens/HomePage';
import Header from './components/Header';
import LoginPage from './screens/LoginPage';
import UserProfile from './screens/UserProfile';
import { Routes, Route } from 'react-router-dom';
import EventPage from './screens/EventPage';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/events' element={<EventPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
