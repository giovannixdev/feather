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

  // transactions state
  const [transactions, setTransactions] = useState([
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 78.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-05-01',
      transaction_type_id: 'expense',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 179.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-05-04',
      transaction_type_id: 'expense',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 19.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-03-25',
      transaction_type_id: 'expense',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 200.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-04-10',
      transaction_type_id: 'expense',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 1000,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-07-12',
      transaction_type_id: 'expense',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 102.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-01-19',
      transaction_type_id: 'expense',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 379.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-03-25',
      transaction_type_id: 'expense',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 9.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2020-12-31',
      transaction_type_id: 'expense',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 39.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-02-04',
      transaction_type_id: 'expense',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 84.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-03-02',
      transaction_type_id: 'expense',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    //2022
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 1000,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2022-01-19',
      transaction_type_id: 'expense',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    // { INCOME }
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 1008.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-02-01',
      transaction_type_id: 'income',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 174.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-03-04',
      transaction_type_id: 'income',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 19.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-04-25',
      transaction_type_id: 'income',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 200.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-06-10',
      transaction_type_id: 'income',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 1000,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-03-12',
      transaction_type_id: 'income',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 102.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-02-19',
      transaction_type_id: 'income',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 379.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-03-25',
      transaction_type_id: 'income',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 9.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-06-30',
      transaction_type_id: 'income',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 39.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-02-04',
      transaction_type_id: 'income',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
    {
      account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
      amount: 84.86,
      category_id: 'food',
      created_at: '2020-12-30T00:21:50.190Z',
      description: 'Human',
      frequency: 'one-time',
      reoccurance_id: '3e908945-20ba-4458-a367-bb99ec9ec81a',
      transaction_date: '2021-03-02',
      transaction_type_id: 'income',
      updated_at: '2020-12-30T00:21:50.190Z',
      _id: '283fd5be-6b9b-40c5-8901-5',
    },
  ]);
  // useEffect(() => {
  //   let user = localStorage.getItem('currentUser')
  //     ? JSON.parse(localStorage.getItem('currentUser')).user
  //     : '';
  //   axios
  //     // {
  //     //   "user_id": "123e4567-e89b-12d3-a456-426652340000",
  //     //   "account_type": "checking",
  //     //   "account_description" : "Test Bank"
  //     // }
  //     .post('api/transactions/getAll', {
  //       user_id: `${user._id}`,
  //       account_type: 'checking',
  //       account_description: `Test Bank`,
  //     })
  //     .then(({ data }) => {
  //       console.log('data from post', data);
  //       setTransactions(data);
  //     })
  //     .catch(err => {
  //       console.log(`Error from RenderContainer -> ${err}`);
  //     });
  // }, []);
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
                <div style={{ display: 'flex' }}>
                  <SideInput
                    style={{ width: '15rem' }}
                    type="text"
                    name="incomeAmount"
                    onChange={handleIncomeChange}
                    placeholder="$"
                  />

                  <StyledSelect
                    style={{ height: '35px' }}
                    name="incomeFrequency"
                    onChange={handleIncomeChange}
                  >
                    <option value="yr">yr</option>
                    <option value="mth">mth</option>
                    <option value="wk">wk</option>
                  </StyledSelect>
                </div>
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
            <LineChart transactions={transactions} />
          </div>
          <TransactionTable />
        </div>
      </HomePage>
    </>
  );
}

export default RenderHomePage;
