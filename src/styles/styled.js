import styled from 'styled-components';

export const StyledFormWrapper = styled.div`
  background: #e5e5e5;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  align-items: center;
  order: 2;
  flex: 1 1 60%;
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
  margin-bottom: 10px;
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

export const StyledImgText = styled.p`
  display: flex;
  align-self: center;
  flex-basis: 20%;
  margin-bottom: 20px;
  font-size: 3.2vw;
  justify-content: center;
  margin-top: 40px;
  padding: 10px;
  color: white;
`;

export const StyledImgContainer = styled.div`
  background-image: url(${'https://media.istockphoto.com/vectors/coins-with-wings-fly-into-the-piggy-bank-vector-id840496806?k=6&m=840496806&s=170667a&w=0&h=6BSCHGqIpG3xMYciHauRLOuAr9kpI_ZNgUx-JpCBTOk='});
  background-repeat: no-repeat;
  background-position: 50% 70%;
  background-color: #94b49b;
  flex: 1 1 auto;
`;
