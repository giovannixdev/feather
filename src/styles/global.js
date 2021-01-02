import { createGlobalStyle } from 'styled-components';

const theme = {
  bg: '#121214',
  color: '#e1e1e1',
  primary: '#8257e6',
};

const GlobalStyle = createGlobalStyle`
*, *:after, *:before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: 0;
}

body {
  background: ${theme.bg};
  color: ${theme.color};
  transition: all 0.15s linear;
  font-size: calc(14px + .5vw);
  font-family: 'Roboto', 'sans-serif';
  line-height: 1.7;
  height: 100vh;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
}

#root {
  /* width: 80%; */
  margin: 0 auto;
  color: #272727
}
`;

export default GlobalStyle;
