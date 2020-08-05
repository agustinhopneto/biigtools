import styled, { css } from 'styled-components';
import { shade } from 'polished';
import ReactLoading from 'react-loading';

interface ContainerProps {
  backgroundColor: string;
  disabled: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${(props) => props.backgroundColor};
  border-radius: 8px;
  color: ${(props) => props.color};
  border: 0;
  padding: 0 18px;
  height: 44px;
  width: 130px;
  font-weight: bold;

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => shade(0.08, props.backgroundColor)};
  }

  ${(props) =>
    props.disabled
      ? css`
          cursor: not-allowed;
          opacity: 0.6;
        `
      : null}
`;

export const Loading = styled(ReactLoading)`
  position: relative;
  top: -9;
`;
