import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Search from './pages/Search';
import Login from './pages/Login';
//import Estates from './pages/Estates';
//import EstateDetail from './pages/EstateDetail';
//import Login from './pages/Login';

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<Search />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  </Router>
);

export default App
