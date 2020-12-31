import React, { createContext, useContext, useReducer } from 'react';
import { TransactionsReducer, transactionsInitialState } from '../reducers';

const TransactionsContext = createContext();
TransactionsContext.displayName = 'TransactionsContext';

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (context === undefined)
    throw new Error(
      'useTransactionsContext must be used within a TransactionsProvider'
    );
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

// The useReducer returns a transactionsState object as state and a dispatch method for triggering state updates/changes, then we pass the transactionsState object and dispatch to as value TransactionsContext provider.
// What this means is that the transactionsState object and dispatch method are available to any children of the TransactionsProvider component
