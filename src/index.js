import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppRoute from './Components/pages/AppRoute';
import { AuthProvider, useAuthState } from './state/contexts';
import { NotFoundPage } from './components/pages/NotFound';
import { LoadingComponent } from './components/common';
import { HomePage } from './components/pages/Home';
import { LoginPage } from './components/pages/Login';
import { RegisterPage } from './components/pages/Register';
import { NavBar } from './components/pages/NavBar';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';

const theme = {
  bg: '#121214',
  color: '#e1e1e1',
  primary: '#8257e6',
};

export default theme;

ReactDOM.render(
  <AuthProvider>
    <Router>
      {/* <React.StrictMode> */}
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
      {/* </React.StrictMode> */}
    </Router>
  </AuthProvider>,
  document.getElementById('root')
);

function App() {
  return (
    <>
      <Switch>
        <AppRoute path="/login" component={LoginPage} />
        <AppRoute path="/register" component={RegisterPage} />
        <AppRoute exact path="/" isPrivate component={HomePage} />
        <AppRoute component={NotFoundPage} />
      </Switch>
    </>
  );
}
