import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthState } from '../../state/contexts';

const AppRoute = ({ component: Component, path, isPrivate, ...rest }) => {
  const { authState } = useAuthState();
  let token = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')).token
    : '';
  console.log('userDetails in appRoute -> ', authState);
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
