import styled from 'styled-components';
import background from '../../assets/background.png';

export const Container = styled.div`
  min-height: 100vh;
  background: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;

  a,
  button {
    font-size: 22px;
    border-radius: 0;
    padding: 24px 0;
  }
`;
