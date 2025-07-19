import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Register from '../pages/Register';
import Login from '../pages/Login'
import Dashboard from '../pages/Admin'


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* user routes */}
        <Route path='/user'>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
        </Route>
        {/* admin panel */}
        <Route path='/admin' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}
