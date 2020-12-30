import React, { useState } from 'react';
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

const StyledSideBar = styled(StyledFormWrapper)`
  background-color: #334f79;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SideInput = styled(StyledInput)`
  width: 15rem;
  border-radius: 5px;
`;

const SideButton = styled(Button)`
  border-radius: 5px;
`;

function RenderHomePage() {
  const [income, setIncome] = useState({});
  const [expense, setExpense] = useState({
    expenseType: 'Expense',
    expenseCategory: 'Category',
  });

  const handleIncomeChange = e => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };

  const handleExpenseChange = e => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = e => {
    setExpense({
      ...expense,
      expenseCategory: e.target.name ? e.target.name : e.target.id,
    });
  };

  return (
    <>
      <NavBar />
      <StyledPage style={{ backgroundColor: '#E5E5E5' }}>
        <div
          style={{
            margin: '80px 20px 20px 20px',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
          }}
        >
          <StyledSideBar>
            <form
              style={{
                margin: '20px 20px 20px 20px',
              }}
            >
              <h2
                style={{
                  color: '#E5E5E5',
                  paddingBottom: '10px',
                }}
              >
                Create Plan
              </h2>
              <div className="field">
                <br />
                <SideInput
                  placeholder="Income Source"
                  type="text"
                  name="incomeSource"
                  onChange={handleIncomeChange}
                />
              </div>

              <div className="field">
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
                <br />
                <SideInput
                  type="text"
                  name="incomeAmount"
                  onChange={handleIncomeChange}
                  placeholder="$"
                />
                <select
                  style={{ height: '35px' }}
                  name="incomeFrequency"
                  onChange={handleIncomeChange}
                >
                  <option value="yr">yr</option>
                  <option value="mth">mth</option>
                  <option value="wk">wk</option>
                </select>
              </div>
              <div>
                <SideButton
                  style={{ borderRadius: '5px' }}
                  buttonText="Add +"
                />
              </div>
              <hr />
              <div style={{ paddingTop: '10px' }}>
                <select
                  style={{ height: '35px', width: '20rem' }}
                  name="expenseType"
                  onChange={handleExpenseChange}
                >
                  <option selected value="Expense">
                    Expense
                  </option>
                  <option value="Bill">Bill</option>
                </select>
              </div>
              <br />
              <div>
                <SideInput
                  style={{ width: '10rem' }}
                  type="date"
                  name="expenseStartDate"
                  placeholder="Start Date"
                  onChange={handleExpenseChange}
                />
                <select
                  style={{ height: '35px', width: '10rem' }}
                  name="expenseFrequency"
                  onChange={handleExpenseChange}
                >
                  <option selected value="onetime">
                    One Time
                  </option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
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
                <SideInput
                  style={{ width: '10rem' }}
                  type="text"
                  name="expenseAmount"
                  onChange={handleExpenseChange}
                  placeholder="$"
                />
                <DropdownMulti
                  category={expense.expenseCategory}
                  handleChange={handleCategoryChange}
                />
              </div>

              <div className="field" style={{ paddingTop: '10px' }}>
                <SideInput
                  placeholder="Type a description"
                  type="text"
                  name="expenseDescription"
                  onChange={handleExpenseChange}
                />
              </div>
              <div>
                <SideButton
                  style={{ borderRadius: '5px' }}
                  buttonText="Add +"
                />
              </div>
            </form>
          </StyledSideBar>
        </div>
        <div
          style={{
            margin: '80px 20px 20px 20px',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            flexBasis: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            order: '2',
            zIndex: '0',
            border: 'black 1px solid',
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
              border: 'black 1px solid',
              width: '100%',
            }}
          >
            <p>Graph Div</p>
          </div>
          <TransactionTable />
        </div>
      </StyledPage>
    </>
  );
}

export default RenderHomePage;
