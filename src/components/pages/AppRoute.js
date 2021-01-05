import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthContext } from '../../state/contexts';

const AppRoute = ({ component: Component, path, isPrivate, ...rest }) => {
  const { authState } = useAuthContext();
  let token = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')).token
    : '';
  return (
    <Route
      path={path}
      render={props =>
        isPrivate && !token ? (
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
