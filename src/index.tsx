import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import Header from './components/Header';
import Status from './components/Status/Status';
import Top from './components/Top';
import Training from './components/Training/Training';
import Result from './components/Result/Result';
import Login from './components/Login';
import { store } from './state/store';

const App = () => {
  // 1. login check: if browser has jwt then check jwt is expired or not
  // 2. Refresh JWT: access to refresh token endpoint and refresh cookie JWT
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/">
              <Status />
            </Route>
            <Route path="/training">
              <Training />
            </Route>
            <Route path="/top">
              <Top />
            </Route>
            <Route path="/result">
              <Result />
            </Route>
            <Route path="/login" >
              <Login />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
