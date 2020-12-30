import React, { useState } from 'react';
import styled from 'styled-components';

export const StyledRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 5px;
`;

export const StyledBox = styled.div.attrs({ contentEditable: true })`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  justify-content: flex-start;
  align-items: flex-start;
  background: white;
  color: gray;
  height: 2.1rem;
  border: lightgray 0.5px solid;
  box-shadow: 20px;
  outline: none;
  transition: 0.15s;
  text-align: left;
  border-radius: 5px;
`;

function TransactionRow({ tr }) {
  return (
    <StyledRow>
      <StyledBox>{tr.transaction_date}</StyledBox>
      <StyledBox>{tr.transaction_type_id}</StyledBox>
      <StyledBox>{tr.frequency}</StyledBox>
      <StyledBox>{tr.amount}</StyledBox>
      <StyledBox>{tr.description}</StyledBox>
      <StyledBox>{tr.category_id}</StyledBox>
      <StyledBox>icons</StyledBox>
    </StyledRow>
  );
}

export default TransactionRow;
