import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { IconButton, Avatar } from '@material-ui/core';
import { logout, useAuthContext } from '../../../state';

const StyledNavBar = styled.div`
  background: #334f79;
  height: 4rem;
  padding-left: 2rem;
  position: fixed;
  top: 0px;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 10000;
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 1.7rem;
`;

function RenderNavBar() {
  const history = useHistory();
  const { authState, dispatch } = useAuthContext(); //read user details from context

  console.log('authState in renderNav -> ', authState.userDetails);
  const handleLogout = () => {
    logout(dispatch); //call the logout action
    history.push({
      pathname: '/login',
    });
  };
  return (
    <StyledNavBar>
      <StyledLink to="/">Feather</StyledLink>
      <span
        style={{
          color: 'lightgray',
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p>Welcome {authState.userDetails.first_name}</p>
        <IconButton onClick={handleLogout}>
          <Avatar src="/broken-image.jpg" />
        </IconButton>
      </span>
    </StyledNavBar>
  );
}

export default RenderNavBar;
