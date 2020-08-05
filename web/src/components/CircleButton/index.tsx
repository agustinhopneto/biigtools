import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<IconBaseProps>;
  backgroundColor: string;
}

const CircleButton: React.FC<ButtonProps> = ({
  color,
  backgroundColor,
  icon: Icon,
  ...rest
}) => (
  <Container
    color={color}
    backgroundColor={backgroundColor}
    type="button"
    {...rest}
  >
    <Icon size={24} />
  </Container>
);

export default CircleButton;
