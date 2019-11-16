import styled from 'styled-components';

export const Container = styled.div`
  width: 400px;
  margin: 0 auto;

  img {
    width: 220px;
    height: 220px;
    display: block;
    object-fit: cover;
    margin: 16px auto;
    border-radius: 50%;
  }

  label {
    width: 200px;
    margin: auto;
  }

  input[type='file'] {
    display: none;
  }
`;
