import './App.css';
import React from 'react'
import {BrowserRouter, Routes, Route, Link, NavLink} from 'react-router-dom'
import Resume from './pages/Resume'
import Internships from './pages/Internships';
import Home from './pages/home'
import Navbar from './pages/navbar'
import Resources from './pages/Resource'
import None from './pages/none'
import Soon from './pages/Soon'
import User from './pages/user'

// This is the home page

function App() {

  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break
    case "/resume":
      component = <Resume />
      break
    case '/jobs':
      component = <Internships />
      break
    case '/interview':
      component = <Soon />
      break
    case '/resources':
      component = <Resources />
      break
    case '/user':
      component = <User />
      break
    default:
      component = <None />
      break

  }

  return (
    <div className="App">
      <Navbar />
      { component }

  
    
    </div>
  );
}

export default App;
