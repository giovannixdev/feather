// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.

import React, { useReducer } from 'react';

let user = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).user
  : '';
let token = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).auth_token
  : '';

export const initialState = {
  userDetails: '' || user,
  token: '' || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        user: '',
        token: '',
      };

    case 'LOGIN_ERROR':
      console.log('action ->', action);
      return {
        ...initialState,
        loading: false,
        error: action.payload.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
