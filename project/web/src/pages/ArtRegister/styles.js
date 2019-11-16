import styled from 'styled-components';

export const RegisterContainer = styled.div`
  width: 600px;
  margin: auto;

  img {
    width: 275px;
    height: 230px;
    display: block;
    object-fit: contain;
    margin: 16px auto;
  }

  label {
    width: 200px;
    margin: auto;
  }

  input[type='file'] {
    display: none;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    width: 47%;
  }
`;

export const Subtitle = styled.h3`
  font-size: 24px;
  color: #b3b3b3;
`;
