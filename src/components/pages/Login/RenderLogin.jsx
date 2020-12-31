import React, { useState } from 'react';
import { loginUser, useAuthContext } from '../../../state';
import { Button } from '../../common';
import { Link, useHistory } from 'react-router-dom';
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
import { useForm } from 'react-hook-form';

function RenderLogin() {
  const history = useHistory();

  const { authState, dispatch } = useAuthContext(); //read the values of loading and errorMessage from context
  const { loading, errorMessage } = authState;

  const [loginInfo, setLoginInfo] = useState({});
  const { register, errors, handleSubmit } = useForm();

  const handleChange = e => {
    console.log('calling handleChange', loginInfo);
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async e => {
    // e.preventDefault();
    const { user_name, password } = loginInfo;
    let payload = { user_name, password };
    try {
      let response = await loginUser(dispatch, payload); //loginUser action makes the request and handles all the neccessary state changes
      console.log('response from login', response);
      
      //navigate to dashboard on success
      history.push({
        pathname: '/',
        // state: { detail: 'some_value'
      });
    } catch (error) {
      console.log(error);
    }
    // sendData();
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
        <form onSubmit={handleSubmit(handleLogin)}>
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
            <StyledInput
              ref={register({ required: true })}
              type="text"
              name="user_name"
              onChange={handleChange}
              disabled={loading}
            />
            {/* {TODO: build styledError component} */}
            {errors.user_name && 'Username is required'}
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
              ref={register({ required: true })}
              type="password"
              name="password"
              onChange={handleChange}
              disabled={loading}
            />
            {/* {TODO: build styledError component} */}
            {errors.password && 'Password is required'}
          </div>
          <div>
            <Button type="submit" buttonText="Log in" disabled={loading} />
            <Link
              style={{ color: '#334F79', fontSize: '1rem' }}
              to="/register"
              className="active"
            >
              Forgot password?
            </Link>
            {errorMessage ? <p>{errorMessage}</p> : null}
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
