import React from 'react';
import Preview from './preview';
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import Chat from './chat';
import QuizComponent from './quiz';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Preview />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/quiz" element={<QuizComponent />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
