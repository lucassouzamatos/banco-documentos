import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  width: 100%;

  h2 {
    padding-bottom: 0;
  }
`;

export const RegisterContainer = styled.div`
  width: 600px;
  margin: auto;

  img {
    width: 275px;
    height: 230px;
    display: block;
    object-fit: cover;
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

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    width: 200px;
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
