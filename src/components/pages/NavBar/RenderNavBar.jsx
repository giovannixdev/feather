import React from 'react';
import styled from 'styled-components';

const StyledNavBar = styled.div`
  background: #334f79;
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;
  justify-content: space-between;
  height: 5rem;
`;

function RenderNavBar() {
  return (
    <StyledNavBar>
      <h1>Feather</h1>
    </StyledNavBar>
  );
}
export default RenderNavBar;
