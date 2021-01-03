import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { deleteTransactions, useTransactions } from '../../../state';

export const StyledRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 5px;
`;

export const StyledBox = styled.div`
  display: flex;
  font: inherit;
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
  text-align: center;
  border-radius: 5px;
  font-size: 1rem;
  margin-left: 2px;
  margin-right: 2px;
  padding-left: 5px;
`;

function TransactionRow({ tr }) {
  const { dispatch } = useTransactions();

  const handleDelete = (e, transaction_id) => {
    const payload = {
      transaction_id: transaction_id,
      deleteReoccurances: true,
    };
    deleteTransactions(dispatch, payload);
  };

  return (
    <StyledRow>
      <StyledBox style={{ width: '10.5vw' }}>{tr.transaction_date}</StyledBox>
      <StyledBox style={{ width: '7vw' }}>{tr.transaction_type_id}</StyledBox>
      <StyledBox style={{ width: '8vw' }}>{tr.frequency}</StyledBox>
      <StyledBox style={{ width: '7vw' }}>{tr.amount}</StyledBox>
      <StyledBox style={{ width: '12vw' }}>{tr.description}</StyledBox>
      <StyledBox style={{ width: '10vw' }}>{tr.category_id}</StyledBox>
      <IconButton aria-label="delete" style={{ width: '5vw' }}>
        <Delete onClick={e => handleDelete(e, tr._id)} />
      </IconButton>
    </StyledRow>
  );
}

export default TransactionRow;
