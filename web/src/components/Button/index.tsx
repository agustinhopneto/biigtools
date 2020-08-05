import React, { ButtonHTMLAttributes } from 'react';

import { Container, Loading } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
  isLoading: boolean;
  isDisabled: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  backgroundColor,
  isDisabled,
  isLoading,
  ...rest
}) => (
  <Container
    disabled={isDisabled}
    color={color}
    backgroundColor={backgroundColor}
    {...rest}
  >
    {isLoading ? <Loading type="bubbles" color={color} /> : children}
  </Container>
);

export default Button;
