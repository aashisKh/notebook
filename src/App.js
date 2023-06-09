

import React from 'react'
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./components/Home";
import About from "./components/About";
import NoteState from './context/notes/NoteState'
// import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from './components/Dashboard';
// import Privateroute from './components/Privateroute';
const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />


          {/* <Alert /> */}
          <Routes>
            <Route exact path="/" element={ <Home />   }></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App

