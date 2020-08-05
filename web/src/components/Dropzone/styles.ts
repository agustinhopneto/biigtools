import styled from 'styled-components';

export const DropzoneContainer = styled.div`
  height: 100px;
  width: 80px;
  background: #00addc;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;

  cursor: pointer;

  img {
    width: 50%;
    height: 50%;
    object-fit: cover;
  }

  p {
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    border-radius: 10px;
    border: 1px dashed #fff;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;

    svg {
      color: #fff;
      width: 24px;
      height: 24px;
      margin-bottom: 8px;
    }
  }
`;
