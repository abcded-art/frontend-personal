/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header.js';
import Main from './components/Main.js';
import AWSCloudSchoolCooperators from './components/common/AWSCloudSchoolCooperators.js';

function App() {
  const [showWith, setShowWith] = useState(false);
  const handleWithClick = () => {
    setShowWith(true);
};

const handleClose = () => {
    setShowWith(false);
};
  return (
    <Router>
      <div className="App">
        <Header onWithClick={handleWithClick}/>
        <Routes>
          <Route path="/*" element={<Main />} />
        </Routes>
        <AWSCloudSchoolCooperators show={showWith} onClose={handleClose} />
      </div>
    </Router>
  );
}

export default App;
