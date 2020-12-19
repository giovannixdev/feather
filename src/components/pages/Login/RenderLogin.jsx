import React, { useState } from 'react';
import { Button } from '../../common';
import { Link } from 'react-router-dom';
import { StyledFormWrapper, StyledPage } from '../../common';

function RenderLogin() {
  return (
    <StyledPage>
      <StyledFormWrapper>
        <form>
          <div>
            <label className="label">Email: </label>
            <br />
            <input
              style={{
                padding: '5px',
                borderRadius: '5px',
                marginBottom: '5px',
              }}
              className="input"
              type="email"
              name="username"
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
            />
          </div>
          <div>
            <Button buttonText="Submit" />
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
