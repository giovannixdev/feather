import React, { useState, useEffect } from 'react';
import TransactionRow from './TransactionRow';
import styled from 'styled-components';
import { StyledRow, StyledBox } from './TransactionRow';
import axios from 'axios';
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
  const [transactions, setTransactions] = useState(null);
  useEffect(() => {
    let user = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')).user
    : '';
    axios
      // {
      //   "user_id": "123e4567-e89b-12d3-a456-426652340000",
      //   "account_type": "checking",
      //   "account_description" : "Test Bank"
      // }
      .post('api/transactions/getAll', {
        user_id: `${user._id}`,
        account_type: 'checking',
        account_description: `Test Bank`,
      })
      .then(({ data }) => {
        console.log(data);
        setTransactions(data);
      })
      .catch(err => {
        console.log(`Error from RenderContainer -> ${err}`);
      });
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
      {transactions
        ? transactions.map(transaction => <TransactionRow tr={transaction} />)
        : null}
    </StyledTableWrapper>
  );
}
export default TransactionTable;
