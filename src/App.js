import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/users/HomePage';
import { useEffect } from 'react';
import LoadingPage from './pages/LoadingPage';

function App() {

  useEffect(()=> {
    CheckIfLoggedIn();
  }, [])

  const CheckIfLoggedIn = () => {
    // NAVIGATE TO HOMEPAGE
  }


  return (
    <div>
      <Router >
        <Routes>
          <Route path="/" element={<LoadingPage/>} />          
          <Route path="/login" element={<LoginPage/>} />          
          <Route path="/signup" element={<SignupPage/>} />          
          <Route path="/user" element={<HomePage/>} />          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
