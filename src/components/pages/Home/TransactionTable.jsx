import React, { useState } from 'react';
import TransactionRow from './TransactionRow';
import styled from 'styled-components';
import { StyledRow, StyledBox } from './TransactionRow';

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
  return (
    <StyledTableWrapper>
      <StyledRow>
        <StyledHeaderBox>Date</StyledHeaderBox>
        <StyledHeaderBox>Type</StyledHeaderBox>
        <StyledHeaderBox>Frequency</StyledHeaderBox>
        <StyledHeaderBox>Amount</StyledHeaderBox>
        <StyledHeaderBox>Category</StyledHeaderBox>
        <StyledHeaderBox>Actions</StyledHeaderBox>
      </StyledRow>
      <TransactionRow />
    </StyledTableWrapper>
  );
}

export default TransactionTable;
