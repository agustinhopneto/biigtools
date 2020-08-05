import React, { SelectHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiChevronDown } from 'react-icons/fi';

import { Container, InputGroup, Tooltip } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon: React.ComponentType<IconBaseProps>;
  label: string;
  color: string;
  hasError: boolean;
  error: string;
  idTooltip: string;
  backgroundColor: string;
}

export const Select: React.FC<SelectProps> = ({
  color,
  backgroundColor,
  label,
  icon: Icon,
  error,
  hasError,
  children,
  idTooltip,
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
        <select {...rest}>{children}</select>
        <FiChevronDown color="#fff" size={16} />
      </InputGroup>
      {hasError && (
        <Tooltip id={idTooltip} type="error">
          <span>{error}</span>
        </Tooltip>
      )}
    </Container>
  );
};

export default Select;
