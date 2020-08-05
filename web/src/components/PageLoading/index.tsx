import React from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles';

const PageLoading: React.FC = () => {
  return (
    <Container>
      <ReactLoading type="bubbles" color="#00addc" width={150} />
    </Container>
  );
};

export default PageLoading;
