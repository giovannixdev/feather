import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { debugContextDevtool } from 'react-context-devtool';

import AppRoute from './components/pages/AppRoute';
import { AuthProvider } from './state';
import { NotFoundPage } from './components/pages/NotFound';
import { HomePage } from './components/pages/Home';
import { LoginPage } from './components/pages/Login';
import { RegisterPage } from './components/pages/Register';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';

// const theme = {
//   bg: '#121214',
//   color: '#e1e1e1',
//   primary: '#8257e6',
// };

// export default theme;

const container = document.getElementById('root');

ReactDOM.render(
  <AuthProvider>
    <Router>
      {/* <React.StrictMode> */}
      {/* <ThemeProvider theme={theme}> */}
      <GlobalStyle />
      <App />
      {/* </ThemeProvider> */}
      {/* </React.StrictMode> */}
    </Router>
  </AuthProvider>,
  container
);

// Attach root container
debugContextDevtool(container);

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
