import React from 'react';
import GoogleAuth from "./googleauth";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preview from 'dashboard/page';
import Chat from './chat';

const App = () => {
  return (
    <>
      <GoogleAuth />
      <Router>
        <Routes>
          <Route path="/" element={<Preview />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
