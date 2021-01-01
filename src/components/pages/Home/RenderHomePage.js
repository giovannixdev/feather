import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledFormWrapper, StyledPage } from '../../../styles/styled';

import { NavBar } from '../NavBar';
import TransactionTable from './TransactionTable';
import { Line } from 'react-chartjs-2';
import LineChart from './DataVis';
import TransactionForm from './TransactionForm';

const StyledSideBar = styled(StyledFormWrapper)`
  background-color: #334f79;
  display: flex;
  flex: 0 0 60%;
  flex-flow: column;
  justify-content: flex-start;
  border-radius: 5px;
  // order: 2;
  position: relative;
`;

const StyledHomePage = styled(StyledPage)`
  height: 100%;
  background-color: #e5e5e5;
`;

function RenderHomePage() {
  return (
    <>
      <NavBar />
      <StyledHomePage>
        <div
          style={{
            margin: '80px 20px 20px 20px',
            display: 'inline-block',
            flexFlow: 'column',
          }}
        >
          <StyledSideBar>
            <TransactionForm />
          </StyledSideBar>
        </div>
        {/* Right Side */}
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
            {/* {transactions.length ? (
              <LineChart transactions={transactions} />
            ) : null} */}
            {/* <LineChart transactions={transactions} /> */}
          </div>
          <TransactionTable />
        </div>
      </StyledHomePage>
    </>
  );
}

export default RenderHomePage;
