import React from 'react';

import { Container } from './styles';

interface WarnProps {
  emoji: string;
}

const NoDataWarn: React.FC<WarnProps> = ({ children, emoji }) => {
  return (
    <Container>
      <div>
        <strong>{children}</strong>
        <span role="img" aria-label="emoji">
          {emoji}
        </span>
      </div>
    </Container>
  );
};

export default NoDataWarn;
