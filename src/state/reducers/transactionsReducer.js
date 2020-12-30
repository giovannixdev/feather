export const transactionsInitialState = {};

export const TransactionsReducer = (prevState, action) => {
  console.log('action from TransactionsReducer->', action);

  switch (action.type) {
    case 'GET_ALL_TRANSACTIONS':
      return {
        ...prevState,
        transactions: action.payload,
        loading: false,
      };
    case 'LOGIN_ERROR':
      return {
        ...prevState,
        loading: false,
        error: action.payload.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
