import React from 'react';
import TransactionsTable from './TransactionTable';
import LineChart from './DataVis';
import { useTransactions } from '../../../state';

function TransactionsView() {
  const { transactionsState } = useTransactions();
  const { transactions } = transactionsState;

  return (
    <>
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
        {transactions.length ? <LineChart transactions={transactions} /> : null}
        {/* <LineChart transactions={transactions} /> */}
      </div>
      <TransactionsTable />
    </>
  );
}

export default TransactionsView;
