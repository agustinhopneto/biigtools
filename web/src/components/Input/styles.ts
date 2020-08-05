import styled from 'styled-components';
import { shade } from 'polished';
import ReactTooltip from 'react-tooltip';

interface InputProps {
  backgroundColor: string;
}

interface ContainerProps {
  color: string;
}

export const Container = styled.div<ContainerProps>`
  margin-bottom: 8px;

  span {
    margin-left: 8px;
    font-weight: bold;
    font-size: 16px;
    color: ${(props) => props.color};
  }
`;

export const InputGroup = styled.div<InputProps>`
  display: flex;
  align-items: center;
  margin-top: 4px;
  background-color: ${(props) => shade(0.08, props.backgroundColor)};
  border-radius: 8px;

  svg {
    margin: 0 12px;
  }

  input {
    border: 0;
    border-radius: 0 8px 8px 0;
    height: 44px;
    padding: 15px;
    font-size: 18px;
    flex: 1;
  }
`;

export const Tooltip = styled(ReactTooltip)`
  span {
    color: #fff;
  }
`;
