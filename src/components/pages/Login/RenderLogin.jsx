import React, { useState } from 'react';
import { Button } from '../../common';
import { Link } from 'react-router-dom';
import { StyledFormWrapper, StyledPage } from '../../../styles/styled';
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
      <StyledFormWrapper>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">Username: </label>
            <br />
            <input
              style={{
                padding: '5px',
                borderRadius: '5px',
                marginBottom: '5px',
              }}
              className="input"
              type="text"
              name="user_name"
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label className="label">Password: </label>
            <br />
            <input
              style={{
                padding: '5px',
                borderRadius: '5px',
                marginBottom: '5px',
              }}
              className="input"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <Button type="submit" buttonText="Submit" />
          </div>
        </form>
        <div>
          <Link to="/register" className="active">
            New to Feather? Create an account.
          </Link>
        </div>
      </StyledFormWrapper>
    </StyledPage>
  );
}

export default RenderLogin;
