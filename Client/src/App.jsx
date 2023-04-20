import { useState } from 'react'
import { BrowserRouter, Routes, Route , useParams} from 'react-router-dom';

import Home from './Components/Home'
import Post from './Components/Post'
import Explore from './Components/Explore'
import Activity from './Components/Activity'
import Journey from './Components/Journey'
import Result from './Components/Result'
import Trip from './Components/Trip'

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
        <Route path="/result" element={<Result />} />
        <Route path="/trip/:idTrip" element={<Trip />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
