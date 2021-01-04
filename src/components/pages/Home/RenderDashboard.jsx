import React from 'react';
import styled from 'styled-components';
import { StyledFormWrapper, StyledPage } from '../../../styles/styled';

import TransactionsForm from './TransactionsForm';
import TransactionsView from './TransactionsView';
import { NavBar } from '../NavBar';

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

function RenderDashboard() {
  console.count('<- RenderDashboard was render');

  return (
    <>
      {/* <NavBar loc="RenderDashboard" /> */}
      <StyledHomePage>
        <div
          style={{
            margin: '80px 20px 20px 20px',
            display: 'inline-block',
            flexFlow: 'column',
          }}
        >
          <StyledSideBar>
            <TransactionsForm />
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
          <TransactionsView />
        </div>
      </StyledHomePage>
    </>
  );
}

export default RenderDashboard;
