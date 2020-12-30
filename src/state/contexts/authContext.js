import React, { createContext, useContext, useReducer } from 'react';
import { AuthReducer, authInitialState } from '../reducers';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, authInitialState);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// The useReducer returns a user object as state and a dispatch method for triggering state updates/changes, then we pass the user object to as value AuthStateContext provider also we pass the dispatch method as value to the AuthDispatchContext provider.
// What this means is that the user object and dispatch method are available to any children of the AuthProvider component
