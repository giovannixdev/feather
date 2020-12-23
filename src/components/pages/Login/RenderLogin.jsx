import React, { useState } from 'react';
import { Button } from '../../common';
import { Link } from 'react-router-dom';
import {
  StyledFormWrapper,
  StyledPage,
  StyledTitle,
  StyledInput,
} from '../../../styles/styled';
import styled from 'styled-components';

const StyledImgContainer = styled.div`
  background-image: url(${'https://media.istockphoto.com/vectors/coins-with-wings-fly-into-the-piggy-bank-vector-id840496806?k=6&m=840496806&s=170667a&w=0&h=6BSCHGqIpG3xMYciHauRLOuAr9kpI_ZNgUx-JpCBTOk='});
  background-repeat: no-repeat;
  background-position: 50% 70%;
  background-color: #94b49b;
  flex-basis: 55%;
  height: 100vh;
  order: 1;
`;

const StyledImgText = styled(StyledTitle.withComponent('p'))`
  display: flex;
  font-size: 1.8rem;
  justify-content: center;
  margin-top: 40px;
  padding: 10px;
  color: white;
`;

function RenderLogin() {
  return (
    <StyledPage>
      <StyledImgContainer>
        <StyledImgText>
          Financial projections
          <br />
          we hope you'll love
        </StyledImgText>
      </StyledImgContainer>
      <StyledFormWrapper>
        <form>
          <StyledTitle capitalize>Login</StyledTitle>
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
            <StyledInput type="email" name="username" />
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
            <StyledInput type="password" name="password" />
          </div>
          <div>
            <Button buttonText="Log in" />
            <Link
              style={{ color: '#334F79', fontSize: '1rem' }}
              to="/register"
              className="active"
            >
              Forgot password?
            </Link>
          </div>
        </form>
        <div>
          <Link style={{ color: '#334F79' }} to="/register" className="active">
            New to Feather? <strong>Create an account.</strong>
          </Link>
        </div>
      </StyledFormWrapper>
    </StyledPage>
  );
}

export default RenderLogin;
