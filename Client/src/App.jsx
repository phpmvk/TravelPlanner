import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Components/Home'
import Post from './Components/Post'
import Explore from './Components/Explore'
import Activity from './Components/Activity'
import Journey from './Components/Journey'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/post" element={<Post />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/activity" element={<Activity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
