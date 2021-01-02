import React, { useState, useEffect } from 'react';
import { Button } from '../../common';
import styled from 'styled-components';
import { StyledInput } from '../../../styles/styled';
import DropdownMulti from '../../common/dropdown';
import axios from 'axios';
import { useTransactions, postTransactions } from '../../../state';

const StyledSelect = styled.select`
  height: 35px;
  padding: 0.5em 3.5em 0.5em 1em;
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const SideInput = styled(StyledInput)`
  width: 15rem;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const SideButton = styled(Button)`
  border-radius: 5px;
`;

function TransactionsForm() {
  const { dispatch } = useTransactions();

  const [income, setIncome] = useState({
    transaction_type: 'income',
    category: null,
    frequency: 'one-time',
  });
  const [expense, setExpense] = useState({
    transaction_type: 'expense',
    frequency: 'one-time',
    category: null,
  });

  const handleIncomeChange = e => {
    setIncome({ ...income, [e.target.name]: e.target.value.toLowerCase() });
  };

  const handleExpenseChange = e => {
    setExpense({ ...expense, [e.target.name]: e.target.value.toLowerCase() });
  };

  const handleCategoryChange = e => {
    setExpense({
      ...expense,
      category: e.target.name
        ? e.target.name.toLowerCase()
        : e.target.id.toLowerCase(),
    });
  };

  const handleIncomeSubmit = e => {
    e.preventDefault();
    return postTransactions(dispatch, income);
  };

  const handleExpenseSubmit = e => {
    e.preventDefault();
    return postTransactions(dispatch, expense);
  };

  console.count('* TransactionsForm was render');

  return (
    <>
      <form
        style={{
          margin: '20px 20px 20px 20px',
        }}
        onSubmit={handleIncomeSubmit}
      >
        <h2
          style={{
            color: '#E5E5E5',
            paddingBottom: '10px',
          }}
        >
          Transactions
        </h2>
        <div className="field">
          <SideInput
            style={{ width: '20rem' }}
            placeholder="Income Source"
            type="text"
            name="transaction_description"
            onChange={handleIncomeChange}
          />
        </div>

        <div className="field">
          <div>
            <label
              className="label"
              style={{
                fontSize: '1rem',
                letterSpacing: '2px',
                color: '#E5E5E5',
              }}
            >
              Income
            </label>
          </div>
        </div>
        <div>
          <SideInput
            style={{ width: '20rem' }}
            type="text"
            name="amount"
            onChange={handleIncomeChange}
            placeholder="$"
          />
        </div>
        <div>
          <SideInput
            style={{ width: '10rem' }}
            type="date"
            name="transaction_date"
            placeholder="Start Date"
            onChange={handleIncomeChange}
          />
          <StyledSelect
            style={{ height: '35px', width: '10rem' }}
            name="frequency"
            onChange={handleIncomeChange}
          >
            <option defaultValue="one-time">One-Time</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="monthly">Annually</option>
          </StyledSelect>
        </div>

        <div>
          <SideButton
            style={{ borderRadius: '5px', marginBottom: '15px' }}
            buttonText="Add +"
          />
        </div>
      </form>
      <hr style={{ width: '20rem' }} />
      <form
        onSubmit={handleExpenseSubmit}
        style={{
          margin: '20px 20px 20px 20px',
        }}
      >
        <div style={{ paddingTop: '15px' }}>
          <StyledSelect
            style={{
              height: '35px',
              width: '20rem',
              marginBottom: '20px',
            }}
            name="transaction_type"
            onChange={handleExpenseChange}
          >
            <option defaultValue="Expense">Expense</option>
            <option value="Bill">Bill</option>
          </StyledSelect>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <SideInput
            style={{ width: '10rem' }}
            type="date"
            name="transaction_date"
            placeholder="Start Date"
            onChange={handleExpenseChange}
          />
          <StyledSelect
            style={{ height: '35px', width: '10rem' }}
            name="frequency"
            onChange={handleExpenseChange}
          >
            <option defaultValue="one-time">One-Time</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </StyledSelect>
        </div>
        <div>
          <label
            className="label"
            style={{
              fontSize: '1rem',
              letterSpacing: '2px',
              color: '#E5E5E5',
            }}
          >
            Expense Amount
          </label>

          <div style={{ display: 'flex' }}>
            <SideInput
              style={{ width: '10rem' }}
              type="text"
              name="amount"
              onChange={handleExpenseChange}
              placeholder="$"
            />
            <DropdownMulti
              category={expense.category}
              handleChange={handleCategoryChange}
            />
          </div>
        </div>

        <div className="field" style={{ paddingTop: '10px' }}>
          <SideInput
            style={{ width: '20rem' }}
            placeholder="Type a description"
            type="text"
            name="transaction_description"
            onChange={handleExpenseChange}
          />
        </div>
        <div>
          <SideButton style={{ borderRadius: '5px' }} buttonText="Add +" />
        </div>
      </form>
    </>
  );
}

export default TransactionsForm;
