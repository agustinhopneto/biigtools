import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 350px;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    background-color: #fff;

    strong {
      font-size: 24px;
      font-weight: normal;
    }

    span {
      font-size: 36px;
      margin-left: 8px;
    }
  }
`;
