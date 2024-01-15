import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './navbar';
import Home from './pages';
import About from './pages/about';
import Contact from './pages/contact';
import { Counter } from './pages/counter';
import './App.css'
import MyForm from './react-final-form/form';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/counter' element={<Counter />} />
        <Route path='/form' element={<MyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
