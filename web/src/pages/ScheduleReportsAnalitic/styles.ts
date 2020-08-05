import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

export const Container = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 96px;
`;

export const Header = styled.header`
  padding: 0 20px 20px 20px;
  border-bottom: 1px solid #ccc;

  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: row;

  > div {
    padding: 20px;
    flex: 1;
    min-width: 300px;
    height: calc(100vh - 185px);

    header {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 20px;
    }

    & + div {
      border-left: 1px solid #ccc;
    }
  }
`;

export const TextInput = styled.input`
  border: 1px solid #00addc;
  border-radius: 8px;
  height: 44px;
  padding: 15px;
  font-size: 18px;
  flex: 1;
  margin-left: 12px;
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

    p {
      flex: 1;
      font-size: 20px;
      font-weight: bold;
    }

    svg {
      color: #58595b;
      margin-right: 12px;
    }

    span {
      margin-left: 12px;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;

  span {
    margin-top: 2px;
    margin-left: 12px;
  }
`;
