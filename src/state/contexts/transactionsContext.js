import React, { createContext, useContext, useReducer } from 'react';
import { TransactionsReducer, transactionsInitialState } from '../reducers';

const TransactionsContext = createContext();

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error(
      'useTransactionsContext must be used within a TransactionsProvider'
    );
  }

  return context;
};

export const TransactionsProvider = ({ children }) => {
  const [transactionsState, dispatch] = useReducer(
    TransactionsReducer,
    transactionsInitialState
  );

  return (
    <TransactionsContext.Provider value={{ transactionsState, dispatch }}>
      {children}
    </TransactionsContext.Provider>
  );
};

// The useReducer returns a user object as state and a dispatch method for triggering state updates/changes, then we pass the user object to as value AuthStateContext provider also we pass the dispatch method as value to the AuthDispatchContext provider.
// What this means is that the user object and dispatch method are available to any children of the AuthProvider component
