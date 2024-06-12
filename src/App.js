/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Header from './components/common/Header.js';
import Main from './components/main/Main.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
