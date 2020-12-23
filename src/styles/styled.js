import styled from 'styled-components';

export const StyledFormWrapper = styled.div`
  background: #e5e5e5;
  display: flex;
  flex-flow: column;
  flex-basis: 100%;
  justify-content: space-evenly;
  align-items: center;
  order: 2;
`;

export const StyledPage = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
`;

export const StyledContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const StyledTitle = styled.h1`
  font-size: 54px;
  text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : 'none')};
  align-self: center;
  flex-basis: 20%;
  margin-bottom: 20px;
  color: #363b3d;
`;

export const StyledInput = styled.input`
  background: white;
  color: black;
  cursor: text;
  margin-bottom: 20px;
  width: 20rem;
  height: 35px;
  border-color: transparent;
  box-shadow: 20px;
  outline: none;
  transition: 0.15s;
  text-align: center;
`;
