import React, { useState } from 'react';
import { Button } from '../../common';
import { Link } from 'react-router-dom';
import {
  StyledFormWrapper,
  StyledPage,
  StyledTitle,
  StyledInput,
  StyledImgText,
  StyledImgContainer,
} from '../../../styles/styled';
import styled from 'styled-components';
import axios from 'axios';

function RenderLogin() {
  const [loginInfo, setLoginInfo] = useState({});

  const handleChange = e => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const url = '/api/login';

  const sendData = () => {
    axios
      .post(url, loginInfo)
      .then(res => console.log(`Data sent -> ${res.data}`))
      .catch(err => console.log(`Error from RenderLogin -> ${err.data}`));
  };

  const handleSubmit = e => {
    e.preventDefault();
    sendData();
  };

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
        <form onSubmit={handleSubmit}>
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
              USERNAME
            </label>

            <br />
            <StyledInput type="text" name="user_name" onChange={handleChange} />
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
            <StyledInput
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <Button type="submit" buttonText="Log in" />
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
