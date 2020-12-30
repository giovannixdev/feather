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
const StyledSideBar = styled(StyledFormWrapper)`
  background-color: #334f79;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  align-items: center;
  order: 2;
  flex: 1 1 60%;
  border-radius: 5px;
  flex-direction: column;
  align-items: center;
`;

const SideInput = styled(StyledInput)`
  width: 15rem;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const SideButton = styled(Button)`
  border-radius: 5px;
`;
const HomePage = styled(StyledPage)`
  height: 100%;
  background-color: #e5e5e5;
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
      <HomePage>
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
                <SideInput
                  style={{ width: '20rem' }}
                  placeholder="Income Source"
                  type="text"
                  name="incomeSource"
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
                <SideInput
                  style={{ width: '15rem' }}
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
                </StyledSelect>
              </div>
              <div>
                <SideButton
                  style={{ borderRadius: '5px', marginBottom: '15px' }}
                  buttonText="Add +"
                />
              </div>
              <hr />
              <div style={{ paddingTop: '15px' }}>
                <StyledSelect
                  style={{
                    height: '35px',
                    width: '20rem',
                    marginBottom: '20px',
                  }}
                  name="expenseType"
                  onChange={handleExpenseChange}
                >
                  <option selected value="Expense">
                    Expense
                  </option>
                  <option value="Bill">Bill</option>
                </StyledSelect>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <SideInput
                  style={{ width: '10rem' }}
                  type="date"
                  name="expenseStartDate"
                  placeholder="Start Date"
                  onChange={handleExpenseChange}
                />
                <StyledSelect
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
                  name="expenseAmount"
                  onChange={handleExpenseChange}
                  placeholder="$"
                />
                <DropdownMulti
                  category={expense.expenseCategory}
                  handleChange={handleCategoryChange}
                />
              </div>
              </div>

              <div className="field" style={{ paddingTop: '10px' }}>
                <SideInput
                  style={{ width: '20rem' }}
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
      </HomePage>
    </>
  );
}

export default RenderHomePage;
