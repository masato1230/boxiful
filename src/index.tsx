import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import Header from './components/Header';
import Status from './components/Status/Status';
import Top from './components/Top';
import Training from './components/Training/Training';
import Result from './components/Result/Result';
import Login from './components/Login';
import Register from './components/Register';
import DeleteAccount from './components/DeleteAccount';
import API from './api';
import { store } from './state/store';
import { useCookies } from 'react-cookie';
import LoginAgainHeader from './components/LoginAgainHeader';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants/cookieKeys';
import TrainingResultBuffer from './components/Result/TrainingResultBuffer';
import Footer from './components/Footer';
import GoogleAnalytics from './components/GoogleAnalytics';
import Privacy from './components/Privacy/Privacy';
import About from './components/Pages/About/About';
import ContactForm from './components/ContactForm';
import AboutJudge from './components/Pages/AboutJudge';
import AboutAccount from './components/Pages/AboutAccount';
import AboutResult from './components/Pages/AboutResult';

const App = () => {
  const [isTokenValid, setIsTokenValid] = useState(true);

  // 1. login check: if browser has jwt then refresh jwt
  const [cookies, setCookie, removeCookie] = useCookies();

  const refreshJwt = () => {
    API.post('users/token/refresh/', {
      refresh: cookies.refreshtoken,
    })
      .then((response) => {
        setCookie(ACCESS_TOKEN, response.data.access);
        setCookie(REFRESH_TOKEN, response.data.refresh);
      })
      .catch((err) => {
        // remove crashed or expired tokens from cookie
        removeCookie(ACCESS_TOKEN);
        removeCookie(REFRESH_TOKEN);
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
          <GoogleAnalytics />
          <Header />
          {!isTokenValid && <LoginAgainHeader />}
          <Switch>
            <Route exact path="/">
              <Status />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/about_judge">
              <AboutJudge />
            </Route>
            <Route path="/about_account">
              <AboutAccount />
            </Route>
            <Route path="/about_result">
              <AboutResult />
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
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/delete_account">
              <DeleteAccount />
            </Route>
            <Route path="/training_to_result">
              <TrainingResultBuffer />
            </Route>
            <Route path="/privacy">
              <Privacy />
            </Route>
            <Route path="/contact_form">
              <ContactForm />
            </Route>
            {/* 404 */}
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
