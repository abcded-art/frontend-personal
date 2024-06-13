/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header.js';
import Main from './components/main/Main.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/*" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
