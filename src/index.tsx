import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Status from './components/Status';
import Top from './components/Top';
import Training from './components/Training';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/status">
          <Status />
        </Route>
        <Route path="/training">
          <Training />
        </Route>
        <Route path="/top">
          <Top />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
