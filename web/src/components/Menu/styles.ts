import styled from 'styled-components';
import { animated } from 'react-spring';
import { shade } from 'polished';

export const Container = styled(animated.nav)`
  min-width: 300px;
  width: 300px;
  height: 100vh;

  background-color: #60c3ad;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 0;

  header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid #f0f5f5;

    img {
      width: 70%;
    }
  }

  footer {
    bottom: 0;
    display: flex;
    border-top: 1px solid #f0f5f5;
    margin-bottom: auto;
    height: 122px;

    img {
      flex: 1;
      justify-content: center;
      width: 40px;
      padding: 20px;
    }
  }
`;

export const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  a {
    display: flex;
    height: 80px;
    align-items: center;
    padding: 15px 30px;
    background-color: #60c3ad;
    text-decoration: none;
    cursor: pointer;

    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.08, '#60c3ad')};
    }

    > span {
      margin-left: 12px;
      font-weight: bold;
      font-size: 20px;
      color: #fff;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: #60c3ad;
`;
