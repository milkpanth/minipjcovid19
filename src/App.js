import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage'
import { Route } from 'react-router-dom';
 import HomePage from './components/HomePage'

function App() {
  return (
    <div >
       <div>
         <Route exact path="/" component={HomePage} />
         <Route path="/login" component={LoginPage} />
       </div>
    </div>
  );
}

export default App;