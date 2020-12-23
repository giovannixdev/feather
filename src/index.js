import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';

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
  <Router>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  const history = useHistory();

  return (
    <>
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/home" component={() => <HomePage />} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}
