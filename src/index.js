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
  console.log("testing")

  return ( 
      <Switch>
        {/* <Route
          path="/"
          exact
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        /> */}
        <Route component={NotFoundPage} />
      </Switch>
  );
}
