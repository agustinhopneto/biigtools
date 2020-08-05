import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${(props) => props.backgroundColor};
  border-radius: 50%;
  color: ${(props) => props.color};
  border: 0;
  padding: 0 16px;
  width: 56px;
  height: 56px;
  font-weight: 500;

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => shade(0.08, props.backgroundColor)};
  }
`;
