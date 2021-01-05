import React from 'react';
import styled from 'styled-components';
import { StyledFormWrapper, StyledPage } from '../../../styles/styled';

import TransactionsForm from './TransactionsForm';
import TransactionsView from './TransactionsView';

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

const StyledHomePage = styled(StyledPage)`
  height: 100vh;
  background-color: #e5e5e5;
  overflow-y: hidden;
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
            height: 'calc(100vh-4rem)',
            display: 'flex',
            flexFlow: 'column',
            flex: '0 0 auto',
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
