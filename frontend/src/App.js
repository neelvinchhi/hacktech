import React from 'react';
import Preview from './preview';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './chat';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Preview />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
