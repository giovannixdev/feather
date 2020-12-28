import React from 'react';
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
`;

const SideButton = styled(Button)`
  border-radius: 5px;
`;

function RenderHomePage() {
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
              <div>
                <DropdownMulti />
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
                  Amount
                </label>
                <br />
                <SideInput type="password" name="password" />
              </div>
              <div>
                <SideButton
                  style={{ borderRadius: '5px' }}
                  buttonText="Add +"
                />
              </div>
              <div>
                <label
                  className="label"
                  style={{
                    fontSize: '1rem',
                    letterSpacing: '2px',
                    color: '#363b3d;',
                  }}
                >
                  EMAIL{' '}
                </label>
                <br />
                <SideInput type="email" name="username" />
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{
                    fontSize: '1rem',
                    letterSpacing: '2px',
                    color: '#363b3d;',
                  }}
                >
                  PASSWORD{' '}
                </label>
                <br />
                <SideInput type="password" name="password" />
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
