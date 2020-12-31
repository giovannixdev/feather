export const transactionsInitialState = {
  transactions: [],
  message: '',
};

const sortTransactions = transactions => {
  transactions.sort((a, b) => {
    return new Date(a.transaction_date) > new Date(b.transaction_date) ? 1 : -1;
  });
  return transactions;
};

export const TransactionsReducer = (prevState, action) => {
  console.log('action from TransactionsReducer->', action);
  let transactions;

  switch (action.type) {
    case 'GET_ALL_TRANSACTIONS':
      return {
        ...prevState,
        transactions: sortTransactions(action.payload),
        loading: false,
      };
    case 'POST_TRANSACTIONS':
      transactions = [...prevState.transactions, action.payload.transactions];

      return {
        ...prevState,
        transactions: sortTransactions(transactions),
        message: action.payload.message,
        loading: false,
      };
    case 'ERROR':
      return {
        ...prevState,
        loading: false,
        error: action.payload.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
