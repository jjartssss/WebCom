import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/users/HomePage';
import { useEffect } from 'react';
import LoadingPage from './pages/LoadingPage';
import ReadPage from './pages/reader/ReadPage';
import ReadChapter from './pages/reader/ReadChapter';
import LandHomePage from './pages/landingpage/LandHomePage';

function App() {

  useEffect(()=> {
    // CheckIfLoggedIn();
  }, [])

  const CheckIfLoggedIn = () => {
    // NAVIGATE TO HOMEPAGE
  }


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoadingPage />} />
          <Route path="/webcom" element={<LandHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user" element={<HomePage />} />
          <Route path="/user/project/:projectID" element={<ReadPage />} />
          <Route path="/user/project/:projectID/chapter/:chapterID" element={<ReadChapter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
