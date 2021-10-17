import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import Header from './components/Header';
import Status from './components/Status';
import Top from './components/Top';
import Training from './components/Training/Training';
import { store } from './state/store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
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
      </div>
    </Provider>
  );
};

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
