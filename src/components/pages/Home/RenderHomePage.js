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

const StyledDD = styled.select`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
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
                }}
              >
                Create Plan
              </h2>
              <div>
                <br />
                <StyledDD>
                  <option value="" disabled selected>
                    Income Type
                  </option>
                  <option value="Albany">Albany</option>
                  <option value="New York">New York (Manhattan)</option>
                  <option value="Kings">Kings (Brooklyn)</option>
                  <option value="Queens">Queens</option>
                  <option value="Bronx">The Bronx</option>
                  <option value="Richmond">Staten Island</option>
                  <option value="Westchester">Westchester</option>
                  <option value="Suffolk">Long Island(Suffolk County)</option>
                  <option value="Nassau">Long Island(Nassau County)</option>
                </StyledDD>
                <select>
                  <option>select me</option>
                  <option>&nbsp;me indented</option>
                  <option>&nbsp;&nbsp;even more indentation</option>
                </select>
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
      </StyledPage>
    </>
  );
}

export default RenderHomePage;
