import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html,
  body,
  #root {
    min-height: 100vh;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body,
  input,
  button {
    font: 14px 'Lato', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  label {
    color: #9E9EA5;
  }

  select {
    width: 100%;
    margin: 0 0 8px 0;
  }
`;
