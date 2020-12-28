import React, { useState } from 'react';
import { Button } from '../../common';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  StyledFormWrapper,
  StyledPage,
  StyledTitle,
  StyledInput,
  StyledImgText,
  StyledImgContainer,
} from '../../../styles/styled';
import styled from 'styled-components';

function RenderRegister() {
  const [newUser, setNewUser] = useState({ rate: 1, type: 'checking' });
  const [page, setPage] = useState(null);

  const handleChange = e => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const url = '/api/user/register';

  const sendData = () => {
    axios
      .post(url, newUser)
      .then(res => console.log(`Data sent -> ${res.data}`))
      .catch(err => console.log(`Error from RenderRegister -> ${err.data}`));
  };

  const handleSubmit = e => {
    e.preventDefault();

    sendData();
  };

  const handleClick = e => {
    e.preventDefault();
    console.log('next/prev clicked');
    !page ? setPage('second') : setPage(null);
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
          <StyledTitle capitalize>Register</StyledTitle>
          {!page ? (
            <>
              <div>
                <label
                  className="label"
                  style={{
                    fontSize: '1rem',
                    letterSpacing: '2px',
                    color: '#363b3d',
                  }}
                >
                  FIRST NAME
                </label>

                <br />
                <StyledInput
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label
                  className="label"
                  style={{
                    fontSize: '1rem',
                    letterSpacing: '2px',
                    color: '#363b3d',
                  }}
                >
                  LAST NAME
                </label>
                <br />
                <StyledInput
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label
                  className="label"
                  style={{
                    fontSize: '1rem',
                    letterSpacing: '2px',
                    color: '#363b3d',
                  }}
                >
                  DATE OF BIRTH
                </label>
                <br />
                <StyledInput
                  type="date"
                  name="birth_date"
                  onChange={handleChange}
                />
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
                  EMAIL
                </label>
                <br />
                <StyledInput
                  type="email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label
                  className="label"
                  style={{
                    fontSize: '1rem',
                    letterSpacing: '2px',
                    color: '#363b3d',
                  }}
                >
                  ACCOUNT TYPE
                </label>
                <br />
                <input
                  type="radio"
                  name="type"
                  value="checking"
                  checked
                  onChange={handleChange}
                />
                <label
                  style={{
                    fontSize: '1rem',
                    letterSpacing: '2px',
                    color: '#363b3d',
                    paddingLeft: '10px',
                  }}
                  htmlFor="checking"
                >
                  Checking
                </label>
              </div>
              <Button
                type="button"
                buttonText="Next Page >"
                handleClick={handleClick}
              />
            </>
          ) : (
              <>
                <div className="field">
                  <label
                    className="label"
                    style={{
                      fontSize: '1rem',
                      letterSpacing: '2px',
                      color: '#363b3d',
                    }}
                  >
                    DESCRIPTION
                </label>
                  <br />
                  <StyledInput
                    type="text"
                    name="description"
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label
                    className="label"
                    style={{
                      fontSize: '1rem',
                      letterSpacing: '2px',
                      color: '#363b3d',
                    }}
                  >
                    BALANCE
                </label>
                  <br />
                  <StyledInput
                    type="number"
                    name="balance"
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label
                    className="label"
                    style={{
                      fontSize: '1rem',
                      letterSpacing: '2px',
                      color: '#363b3d',
                    }}
                  >
                    USERNAME
                </label>
                  <br />
                  <StyledInput
                    type="text"
                    name="user_name"
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label
                    className="label"
                    style={{
                      fontSize: '1rem',
                      letterSpacing: '2px',
                      color: '#363b3d',
                    }}
                  >
                    PASSWORD
                </label>
                  <br />
                  <StyledInput
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Button
                    type="button"
                    buttonText="< Prev Page"
                    handleClick={handleClick}
                  />
                  <Button type="submit" buttonText="Register" />
                </div>
              </>
            )}
          <Link
            style={{ color: '#334F79', fontSize: '1rem' }}
            to="/"
            className="active"
          >
            Back to Login.
          </Link>
        </form>
      </StyledFormWrapper>
    </StyledPage>
  );
}

export default RenderRegister;
