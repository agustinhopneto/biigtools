import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  padding: 20px;
  margin-left: 96px;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 36px;

    h1 {
      font-size: 46px;
      margin-left: 24px;
    }
  }
`;

export const Section = styled.div`
  h2 {
    font-size: 36px;
    margin-bottom: 20px;
  }
`;

export const Navigation = styled.ul`
  display: flex;
  flex-direction: 1;
  align-items: center;
  list-style: none;

  flex-wrap: wrap;

  li {
    cursor: pointer;

    margin-bottom: 8px;

    border-radius: 8px;

    background-color: #fff;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s;

    & + li {
      margin-left: 8px;
    }

    &:hover {
      background-color: #00addc;

      a span {
        color: #fff;
      }

      a svg {
        color: #fff;
      }
    }

    svg {
      color: #58595b;
      transition: color 0.2s;
    }

    a span {
      margin-left: 12px;
      font-size: 24px;
      font-weight: bold;
      transition: color 0.2s;
    }
  }
`;

export const Navigate = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #58595b;
  padding: 20px;
`;
