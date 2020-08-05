import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from './styles/GlobalStyle';
import { Container } from './styles/styles';

import Routes from './routes';

import Menu from './components/Menu';

const App: React.FC = () => {
  return (
    <Container>
      <Router>
        <Menu />

        <Routes />
      </Router>

      <ToastContainer />
      <GlobalStyle />
    </Container>
  );
};

export default App;
