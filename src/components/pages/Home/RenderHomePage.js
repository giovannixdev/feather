import React, { useState, useEffect } from 'react';
import { Button } from '../../common';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  StyledFormWrapper,
  StyledInput,
  StyledPage,
} from '../../../styles/styled';
import { NavBar } from '../NavBar';
import TransactionTable from './TransactionTable';
import DropdownMulti from '../../common/dropdown';
import { Line } from 'react-chartjs-2';
import LineChart from './DataVis';
import axios from 'axios';
import { useTransactions, postTransactions } from '../../../state';

const StyledSelect = styled.select`
  height: 5vh;
  padding: 0.5em 3.5em 0.5em 1em;
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 1.288em) 2.3vh, calc(100% - 0.62em) 2.3vh,
    calc(100% - 2.5em) 0.5em;
  background-size: 0.7em 0.7em, 0.7em 0.7em, 0.1em 3.5vh;
  background-repeat: no-repeat;
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 5px;
  &option:invalid {
    color: lightgray;
  }
`;
const StyledSideBar = styled(StyledFormWrapper)`
  background-color: #334f79;
  height: calc(100vh-4rem);
  max-height: 1000px;
  min-height: 600px;
  display: flex;
  flex: 1 1 60%;
  flex-flow: column;
  justify-content: space-evenly;
  border-radius: 5px;
  order: 2;
  position: relative;
`;

const SideInput = styled(StyledInput)`
  width: 15rem;
  border-radius: 5px;
  margin-bottom: 5px;
  height: 5vh;
`;

const SideButton = styled(Button)`
  border-radius: 5px;
  height: 5vh;
`;
const HomePage = styled(StyledPage)`
  height: 100vh;
  background-color: #e5e5e5;
  overflow-y: hidden;
`;

function RenderHomePage() {
  const { transactionsState, dispatch } = useTransactions();
  const { transactions } = transactionsState;

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

  return (
    <>
      <NavBar />
      <HomePage>
        <div
          style={{
            margin: '80px 20px 20px 20px',
            height: 'calc(100vh-4rem)',
            display: 'flex',
            flexFlow: 'column',
            flex: '0 0 auto',
          }}
        >
          <StyledSideBar>
            <form
              style={{
                margin: '0.5vh 20px 0.5vh 20px',
              }}
              onSubmit={handleIncomeSubmit}
            >
              <div>
                <h2
                  style={{
                    color: '#E5E5E5',
                  }}
                >
                  Transactions
                </h2>
              </div>
              <div
                style={{
                  marginBottom: '0.5vh',
                }}
              >
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
              <div
                style={{
                  marginBottom: '0.5vh',
                }}
              >
                <SideInput
                  style={{ width: '20rem' }}
                  placeholder="Income Source"
                  type="text"
                  name="transaction_description"
                  onChange={handleIncomeChange}
                />
              </div>

              <div
                style={{
                  marginBottom: '0.5vh',
                }}
              >
                <SideInput
                  style={{ width: '20rem' }}
                  type="text"
                  name="amount"
                  onChange={handleIncomeChange}
                  placeholder="$ amount"
                />
              </div>
              <div
                style={{
                  marginBottom: '0.5vh',
                }}
              >
                <SideInput
                  style={{ width: '10rem' }}
                  type="date"
                  name="transaction_date"
                  placeholder="Start Date"
                  onChange={handleIncomeChange}
                />
                <StyledSelect
                  style={{ width: '10rem' }}
                  name="frequency"
                  onChange={handleIncomeChange}
                >
                  <option selected value="one-time">
                    One Time
                  </option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="monthly">Annually</option>
                </StyledSelect>
              </div>

              <div
                style={{
                  marginBottom: '0.5vh',
                }}
              >
                <SideButton
                  style={{
                    borderRadius: '5px',
                    height: '5vh',
                    marginBottom: '2vh',
                  }}
                  buttonText="Add +"
                />
              </div>
            </form>
            <hr style={{ width: '30vw', margin: '0 20px 0 20px' }} />
            <form
              onSubmit={handleExpenseSubmit}
              style={{
                margin: '0.5vh 20px 1vh 20px',
              }}
            >
              <div
                style={{
                  marginBottom: '0.5vh',
                }}
              >
                <label
                  className="label"
                  style={{
                    fontSize: '1rem',
                    letterSpacing: '2px',
                    color: '#E5E5E5',
                  }}
                >
                  Expense
                </label>
              </div>
              <div
                style={{
                  marginBottom: '0.5vh',
                }}
              >
                <StyledSelect
                  style={{
                    width: '20rem',
                    marginBottom: '0.5vh',
                  }}
                  name="transaction_type"
                  onChange={handleExpenseChange}
                >
                  <option value="" disabled selected>
                    Choose Expense Type
                  </option>
                  <option value="Expense">Expense</option>
                  <option value="Bill">Bill</option>
                </StyledSelect>
              </div>
              <div
                style={{
                  marginBottom: '0.5vh',
                }}
              >
                <SideInput
                  style={{ width: '10rem' }}
                  type="date"
                  name="transaction_date"
                  placeholder="Start Date"
                  onChange={handleExpenseChange}
                />
                <StyledSelect
                  style={{ width: '10rem' }}
                  name="frequency"
                  onChange={handleExpenseChange}
                >
                  <option selected value="one-time">
                    One Time
                  </option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                </StyledSelect>
              </div>
              <div
                style={{
                  marginBottom: '0.5vh',
                }}
              >
                <div style={{ display: 'flex' }}>
                  <SideInput
                    style={{ width: '10rem' }}
                    type="text"
                    name="amount"
                    onChange={handleExpenseChange}
                    placeholder="$ amount"
                  />
                  <DropdownMulti
                    category={expense.category}
                    handleChange={handleCategoryChange}
                  />
                </div>
              </div>

              <div
                style={{
                  marginBottom: '0.5vh',
                }}
              >
                <SideInput
                  style={{ width: '20rem' }}
                  placeholder="Type a description"
                  type="text"
                  name="transaction_description"
                  onChange={handleExpenseChange}
                />
              </div>
              <div>
                <SideButton
                  style={{
                    borderRadius: '5px',
                    height: '5vh',
                  }}
                  buttonText="Add +"
                />
              </div>
            </form>
          </StyledSideBar>
        </div>
        <div
          style={{
            margin: '80px 20px 20px 0px',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            flexBasis: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            order: '2',
            zIndex: '0',
            height: '100vh',
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
            {transactions.length ? (
              <LineChart transactions={transactions} />
            ) : null}
            {/* <LineChart transactions={transactions} /> */}
          </div>

          <TransactionTable />
        </div>
      </HomePage>
    </>
  );
}

export default RenderHomePage;
