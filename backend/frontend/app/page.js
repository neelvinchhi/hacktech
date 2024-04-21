import React from 'react';
import GoogleAuth from "./googleauth";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Preview from 'dashboard/page';
import Chat from './chat';

const App = () => {
  return (
    <>
      <GoogleAuth />
      <Router>
        <Switch>
          <Route path="/" exact component={Preview} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </Router>
    </>
  );
}
