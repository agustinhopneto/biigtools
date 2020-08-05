import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container, InputGroup, Tooltip } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentType<IconBaseProps>;
  label: string;
  color: string;
  hasError: boolean;
  error: string;
  backgroundColor: string;
  idTooltip: string;
}

export const Input: React.FC<InputProps> = ({
  color,
  backgroundColor,
  label,
  icon: Icon,
  error,
  idTooltip,
  hasError,
  ...rest
}) => {
  return (
    <Container color={color}>
      <span>{label}</span>
      <InputGroup
        data-tip={idTooltip}
        data-for={idTooltip}
        color={color}
        backgroundColor={backgroundColor}
      >
        <Icon color={hasError ? '#f30' : color} size={24} />
        <input {...rest} />
      </InputGroup>
      {hasError && (
        <Tooltip id={idTooltip} type="error">
          <span>{error}</span>
        </Tooltip>
      )}
    </Container>
  );
};

export default Input;
