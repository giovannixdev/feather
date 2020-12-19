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

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  const history = useHistory();
  console.log('testing');

  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/home" exact component={() => <HomePage />} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}
