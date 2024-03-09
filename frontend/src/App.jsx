import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Dashboard'
import HomePage from './Components/Home'
import LoginForm from './Components/Login';
import RegisterForm from './Components/Signup';
import Predict from './Components/Predict';
import HistoryDisplay from './Components/History';

function App() {
 return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/register" element={<RegisterForm/>} />
      <Route path="/predict" element={<Predict/>} />
      <Route path="/history" element={<HistoryDisplay/>} />
      </Routes>
    </Router>
 );
}

export default App;
