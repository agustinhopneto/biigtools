import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

export const Container = styled.div`
  flex: 1;
  height: calc(100vh - 150px);
  padding: 20px;
  margin-left: 96px;
  margin-right: 400px;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-bottom: 18px;

  > svg {
    margin-left: 20px;
  }
`;

export const ScrollbarView = styled(Scrollbars)``;

export const List = styled.ul`
  list-style: none;

  li {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    margin-bottom: 8px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: #00addc;

      p {
        color: #fff;
      }

      svg {
        color: #fff;
      }

      strong {
        color: '#fff';
      }
    }

    div {
      display: flex;
      flex: 1;
      flex-direction: column;
      margin: 0 12px;

      p {
        flex: 1;
        font-size: 20px;
        font-weight: bold;

        transition: color 0.2s;
      }

      span {
        margin-top: 2px;
        transition: color 0.2s;
      }
    }

    svg {
      color: #58595b;
      transition: color 0.2s;
    }
  }
`;

export const Form = styled.form`
  width: 400px;
  padding: 20px;

  position: fixed;
  top: 0;
  right: 0;

  height: 100vh;

  background-color: #00addc;
  box-shadow: -4px 0 4px rgba(0, 0, 0, 0.2);

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 44px;

    h1 {
      color: #fff;
      margin-right: 8px;
    }
  }

  footer {
    margin-top: 44px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
`;
