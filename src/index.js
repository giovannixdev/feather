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
  console.log("testing")

  return ( 
    <div>
    <NavBar/>
      <Switch>
        <Route
          path="/"
          exact
          component={() => <HomePage /> } />
          {/* <Route
          path="/example"
          component={SamplePage} /> */}
        <Route component={NotFoundPage} />
      </Switch>
      </div>
  );
}
