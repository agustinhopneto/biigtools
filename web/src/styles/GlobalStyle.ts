import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background-color: #f0f5f5;
  }

  body, input, button, select, option {
    font-family: 'GE Inspira', sans-serif;
    color: #58595b;

    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: bold;
  }

  button {
    cursor: pointer;
  }
`;
