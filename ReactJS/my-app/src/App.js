import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg'
import Comments from './pages/Comment';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Clock from './pages/Clock';
import { CommerceModule, faker } from '@faker-js/faker';
import Video from './pages/Video';
import Hooks from './pages/Hooks';
import Image from './pages/Image';
// import './App.css';

function App() {
  return (
    <div className="App">
      <main className='px-10 py-10 min-h-screen'>
        <BrowserRouter>
          <Routes>
            <Route path = '/' element = { <Home /> } />
            <Route path = '/contact' element = { <Contact /> } />
            <Route path = '/image' element = { <Image /> } />
            <Route path = '/comment' element = { <Comments /> } />
            <Route path = '/clock' element = { <Clock /> } />
            <Route path = '/video' element = { <Video /> } />
            <Route path = '/hooks' element = { <Hooks /> } />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
