import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

import { useAuthState } from '../../state/contexts';

// const history = useHistory();

const AppRoute = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();
  return (
    <Route
      path={path}
      render={props =>
        isPrivate && !userDetails.token ? (
          // isPrivate ? (
          <Redirect to={{ pathname: '/login' }} />
        ) : (
            <Component {...props} />
          )
      }
      {...rest}
    />
  );
};

export default AppRoute;
