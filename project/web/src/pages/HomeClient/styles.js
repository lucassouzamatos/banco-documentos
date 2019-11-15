import styled from 'styled-components';
import logo from '~/assets/background-client.png';

export const BackgroundImage = styled.div`
  background: url(${logo});
  height: 300px;
  background-size: cover;
  background-position: center center;
`;

export const ArtsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const ModalContent = styled.div`
  img {
    width: 100%;
    max-height: 450px;
    object-fit: cover;
  }
`;
