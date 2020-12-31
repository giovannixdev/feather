import React, { useState, useEffect } from 'react';
import TransactionRow from './TransactionRow';
import styled from 'styled-components';
import { StyledRow, StyledBox } from './TransactionRow';
import { useTransactions, getAllTransactions } from '../../../state';
const StyledTableWrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  justify-content: flex-start;
  align-items: space-between;
  order: 2;
  border: black 1px solid;
  width: 100%;
`;
const StyledHeaderBox = styled(StyledRow)`
  border-color: transparent;
`;
function TransactionTable() {
  // const [transactions, setTransactions] = useState(null);
  const { transactionsState, dispatch } = useTransactions();
  const { transactions } = transactionsState;
  useEffect(() => {
    async function fetchTransactions() {
      let user = localStorage.getItem('currentUser')
        ? JSON.parse(localStorage.getItem('currentUser')).user
        : '';
      const payload = {
        user_id: `${user._id}`,
        account_type: 'checking',
        account_description: `Test Bank`,
      };
      try {
        let response = await getAllTransactions(dispatch, payload);
        console.log('response TransactionTable->', response);
        if (response.error) console.log(response.error); //whatever message handler for transaction feedback
        return;
      } catch (error) {
        console.log(error);
      }
    }
    fetchTransactions();
  }, []);

  return (
    <StyledTableWrapper>
      <StyledRow>
        <StyledHeaderBox>Date</StyledHeaderBox>
        <StyledHeaderBox>Type</StyledHeaderBox>
        <StyledHeaderBox>Frequency</StyledHeaderBox>
        <StyledHeaderBox>Amount</StyledHeaderBox>
        <StyledHeaderBox>Description</StyledHeaderBox>
        <StyledHeaderBox>Category</StyledHeaderBox>
        <StyledHeaderBox>Actions</StyledHeaderBox>
      </StyledRow>
      {/* <div>
        <pre>{JSON.stringify(transactions, null, 2)}</pre>
      </div> */}
      {transactions
        ? transactions.map(transaction => <TransactionRow tr={transaction} />)
        : null}
    </StyledTableWrapper>
  );
}
export default TransactionTable;
