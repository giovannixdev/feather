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
  order: 3;
  border: lightgray 0.5px solid;
  border-radius: 5px;
  background-color: lightgray;
  width: 100%;
  overflow-y: auto;
`;
const StyledHeaderBox = styled.div`
  border-color: #e5e5e5;

  height: 2.1rem;
  box-shadow: 20px;
  outline: none;
  transition: 0.15s;
  text-align: center;
  border-radius: 5px;
  font-size: 1.2rem;
`;

const StyledHeaderRow = styled(StyledRow)`
  height: 2.4rem;
  order: 2;
  align-items: center;
  z-index: 10000;
  background-color: lightgray;
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
        if (response.error) console.log(response.error); //whatever message handler for transaction feedback
        return;
      } catch (error) {
        // console.log(error);
      }
    }
    fetchTransactions();
  }, []);

  return (
    <>
      <StyledHeaderRow>
        <StyledHeaderBox style={{ width: '10.5vw' }}>Date</StyledHeaderBox>
        <StyledHeaderBox style={{ width: '7vw' }}>Type</StyledHeaderBox>
        <StyledHeaderBox style={{ width: '8vw' }}>Frequency</StyledHeaderBox>
        <StyledHeaderBox style={{ width: '7vw' }}>Amount</StyledHeaderBox>
        <StyledHeaderBox style={{ width: '12vw' }}>Description</StyledHeaderBox>
        <StyledHeaderBox style={{ width: '10vw' }}>Category</StyledHeaderBox>
        <StyledHeaderBox style={{ width: '5vw' }}>Actions</StyledHeaderBox>
      </StyledHeaderRow>
      <StyledTableWrapper>
        {/* <div>
        <pre>{JSON.stringify(transactions, null, 2)}</pre>
      </div> */}
        {transactions
          ? transactions.map(transaction => <TransactionRow tr={transaction} />)
          : null}
      </StyledTableWrapper>
    </>
  );
}
export default TransactionTable;
