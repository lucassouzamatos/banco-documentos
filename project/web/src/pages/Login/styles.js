import styled from 'styled-components';

export const Container = styled.div`
  width: 400px;
  margin: 0 auto;

  a {
    color: #000;
    text-transform: uppercase;
    text-align: center;
    display: block;
    margin: 8px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 12px;
  }

  > div {
    width: 100%;
  }
`;
