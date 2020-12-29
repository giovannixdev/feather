import React, { useState } from 'react';
import { Button } from '../../common';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import FormUserInfo from './FormUserInfo';
import FormUserAccount from './FormUserAccount';
import FormUserCredentials from './FormUserCredentials';
import { loginUser, useAuthState, useAuthDispatch } from '../../../state';

import {
  StyledFormWrapper,
  StyledPage,
  StyledTitle,
  StyledInput,
  StyledImgText,
  StyledImgContainer,
} from '../../../styles/styled';
function RenderRegister() {
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();
  const history = useHistory();

  const [newUser, setNewUser] = useState({ rate: 1, type: 'checking' });
  const { register, errors, handleSubmit } = useForm();
  const [page, setPage] = useState('first');
  const [registerMessage, setRegisterMessage] = useState(null);

  const handleChange = e => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const sendData = () => {
    const url = '/api/auth/register';
    axios
      .post(url, newUser)
      .then(res => {
        !res.data.error_message
          ? handleLogin()
          : setRegisterMessage(res.data.error_message);
      })
      .catch(err => {
        console.log(`Error from RenderRegister -> ${err}`);
      });
  };

  const handleLogin = async () => {
    const { user_name, password } = newUser;
    let payload = { user_name, password };
    try {
      let response = await loginUser(dispatch, payload); //loginUser action makes the request and handles all the neccessary state changes
      console.log(response);
      if (!response.user) {
        // setRegisterMessage(response.error_message);
        debugger;
        return;
      }
      //navigate to dashboard on success
      history.push({
        pathname: '/',
        // state: { detail: 'some_value'
      });
    } catch (error) {
      console.log(error);
    }
  };

  const registrationSubmit = page => {
    // e.preventDefault();
    debugger;
    setPage(page);
    if (!page) sendData();
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
        {page === 'first' ? (
          <FormUserInfo
            handleChange={handleChange}
            registrationSubmit={registrationSubmit}
            newUser={newUser}
          />
        ) : page === 'second' ? (
          <FormUserAccount
            handleChange={handleChange}
            registrationSubmit={registrationSubmit}
            newUser={newUser}
          />
        ) : (
              <FormUserCredentials
                handleChange={handleChange}
                registrationSubmit={registrationSubmit}
                newUser={newUser}
                registerMessage={registerMessage}
              />
            )}
        <Link
          style={{ color: '#334F79', fontSize: '1rem' }}
          to="/"
          className="active"
        >
          Back to Login.
        </Link>
      </StyledFormWrapper>
    </StyledPage>
  );
}
export default RenderRegister;
