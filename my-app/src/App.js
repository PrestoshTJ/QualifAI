import './App.css';
import React from 'react'
import {BrowserRouter, Routes, Route, Link, NavLink} from 'react-router-dom'
import Resume from './pages/Resume'
import Internships from './pages/Internships';
import Home from './pages/home'
import Navbar from './pages/navbar'
import Resources from './pages/Resource'
import None from './pages/none'

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
      component = <Internships />
      break
    case '/resources':
      component = <Resources />
      break
    case '/user':
      component = <Resources />
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
