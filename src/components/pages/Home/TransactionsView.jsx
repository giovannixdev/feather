import React, { useEffect } from 'react';
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
        {/* <TransactionsViewChart /> */}
      </div>
      <TransactionsViewTable />
    </>
  );
}

export default TransactionsView;
