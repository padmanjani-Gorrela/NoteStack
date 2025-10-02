import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import Login from './pages/login/login';
import Signup from './pages/Signup/Signup';
//import Home from './pages/Home/home';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<LandingPage/>}/>
        <Route path="/dashboard" element={<Home/>} />
        <Route path ="/login" element={<Login/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
      </Routes>
    </Router>
    
  );
};

export default App;
