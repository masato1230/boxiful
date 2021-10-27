import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import Header from './components/Header';
import Status from './components/Status/Status';
import Top from './components/Top';
import Training from './components/Training/Training';
import { store } from './state/store';
import Result from './components/Result/Result';

const App = () => {
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
