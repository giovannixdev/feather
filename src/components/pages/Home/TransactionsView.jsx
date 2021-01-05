import React from 'react';
import TransactionsViewTable from './TransactionViewTable';
import TransactionsViewChart from './TransactionsViewChart';
import { useTransactions } from '../../../state';

function TransactionsView() {
  const { transactionsState } = useTransactions();
  const { transactions } = transactionsState;

  console.count('* TransactionsView was render');

  return (
    <>
      <div
        style={{
          margin: '0px 0px 0px 0px',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          flexBasis: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          order: '2',
          zIndex: '0',
          height: '85vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexFlow: 'row',
            flex: '1 1 auto',
            justifyContent: 'center',
            alignItems: 'center',
            order: '1',
            border: 'transparent',
            borderRadius: '5px',
            marginBottom: '5px',
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          {transactions.length > 0 ? (
            <TransactionsViewChart transactions={transactions} />
          ) : null}
        </div>
        <TransactionsViewTable />
      </div>
    </>
  );
}

export default TransactionsView;
