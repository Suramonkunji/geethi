import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Questionnaire from './pages/Questionnaire';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Questionnaire />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;