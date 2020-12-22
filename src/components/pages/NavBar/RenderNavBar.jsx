import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNavBar = styled.div`
  background: #334f79;
  height: 4rem;
  display: flex;
  align-items: center;
  padding-left: 2rem;
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 1.7rem;
`

function RenderNavBar() {
  return (
    <StyledNavBar>
      <StyledLink to="/">Feather</StyledLink>
    </StyledNavBar>
  );
}

export default RenderNavBar;
