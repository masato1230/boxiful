import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router';
import { Router, BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import Header from './components/Header';
import Status from './components/Status/Status';
import Top from './components/Top';
import Training from './components/Training/Training';
import Result from './components/Result/Result';
import Login from './components/Login';
import API from './api';
import { store } from './state/store';
import { useCookies } from 'react-cookie';
import LoginAgainHeader from './components/LoginAgainHeader';

const App = () => {
  const [isTokenValid, setIsTokenValid] = useState(true);

  // 1. login check: if browser has jwt then refresh jwt
  const [cookies, setCookie, removeCookie] = useCookies();
  
  const refreshJwt = () => {
    API.post('users/token/refresh/', {
      refresh: cookies.refreshtoken,
    }).then((response) => {
      setCookie('accesstoken', response.data.access);
      setCookie('refreshtoken', response.data.refresh);
    }).catch (err => {
      // remove crashed or expired tokens from cookie
      removeCookie('accesstoken');
      removeCookie('refreshtoken');
      if (err.response.status === 401) {
        setIsTokenValid(false);
        return;
      }
      console.log(err);
    });
  };

  // set up
  useEffect(() => {
    // refresh JWT tokens if user has JWT tokens in cookie
    if (cookies.accesstoken && cookies.refreshtoken) {
      refreshJwt();
    }
  }, []);

  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Header />
          { !isTokenValid && <LoginAgainHeader /> }
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
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
