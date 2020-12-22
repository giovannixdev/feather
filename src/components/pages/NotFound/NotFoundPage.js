import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalStyle from '../../../styles/global'
import styled, { ThemeProvider } from 'styled-components'
import { StyledContainer } from '../../../styles/styled'

const textParagraph = `Unfortunately the page you're looking for doesn't exist(anymore) or there
was an error in the link you follow or typed`;

//Inheritance
const StyledContainerNFP = styled(StyledContainer)`
  background: ${({ theme }) => theme.bgColor};
  /* margin: 0; */
`;

const StyledButton = styled.button`
  background-color: ${props => props.theme.btnBg};
  color: ${props => props.theme.btnColor};
  border: none;
  border-radius: 2px;
  padding: 1em 3em;
  margin: 15px 0;
`;

const StyledTitle = styled.h1`
  font-size: 54px;
  color: ${props => props.theme.color};
  font-family: Arial;
  text-transform: ${({ capitalize }) => capitalize ? "capitalize" : "none"};
`;

const StyledText = styled(StyledTitle.withComponent('p'))`
  font-size: 1.8rem;
  line-height: 1.65;
`;

function NotFoundPage() {
  const [dark, setDark] = useState(false)

  const themeLight = {
    bgColor: "#FFF",
    color: "#0d1117",
    btnBg: "#0d1117",
    btnColor: "#FFF",
  }

  const themeDark = {
    bgColor: "#0d1117",
    color: "#FFF",
    btnBg: "#FFF",
    btnColor: "#0d1117",
  }

  return (
    <ThemeProvider theme={dark ? themeDark : themeLight}>
      <GlobalStyle />
      <StyledContainerNFP>
        <StyledTitle capitalize>page not found</StyledTitle>
        <StyledText>{textParagraph}</StyledText>
        <Link to="/">
          <StyledButton onMouseOver={() => setDark(!dark)}>Go to HomePage</StyledButton>
        </Link>
      </StyledContainerNFP>
    </ThemeProvider >
  );
};

export default NotFoundPage;
