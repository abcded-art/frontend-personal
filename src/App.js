/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
