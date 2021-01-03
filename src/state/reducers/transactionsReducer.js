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

const dateFormat = transactions => {
  if (!transactions[0].transaction_date.includes('/')) {
    transactions.forEach(transaction => {
      let year = transaction.transaction_date.slice(0, 4);
      let month = transaction.transaction_date.slice(5, 7);
      let day = transaction.transaction_date.slice(8, 10);

      // transaction.transaction_date = `${month}/${day}/${year}`;

      // transaction.transaction_date = transaction.transaction_date.slice(0, 10);

      transaction.transaction_date = `${month}/${day}/${year}`;
    });

    console.log(transactions[0].transaction_date);
  }
  return transactions;
};

export const TransactionsReducer = (prevState, action) => {
  console.log('action from TransactionsReducer->', action);
  let transactions;
  let deleteId;

  switch (action.type) {
    case 'GET_ALL_TRANSACTIONS':
      return {
        ...prevState,
        transactions: dateFormat(sortTransactions(action.payload)),
        loading: false,
      };

    case 'POST_TRANSACTIONS':
      console.info('action in POST -> ', action);
      transactions = [
        ...prevState.transactions,
        ...dateFormat(action.payload.transactions),
      ];

      return {
        ...prevState,
        transactions: sortTransactions(transactions),
        message: action.payload.message,
        loading: false,
      };

    case 'DELETE_TRANSACTIONS':
      console.info('action in DELETE -> ', action);

      deleteId = action.payload.reoccurance_id || action.payload.transaction_id;
      transactions = [...prevState.transactions].filter(
        tr => (tr.reoccurance_id || tr._id) !== deleteId
      );
      console.log(
        'transactions in DELETE_TRANSACTIONS after sort is -> ',
        transactions
      );
      return {
        ...prevState,
        transactions: transactions,
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
