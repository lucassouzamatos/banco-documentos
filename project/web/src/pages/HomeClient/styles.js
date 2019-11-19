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

export const ModalContent = styled.div``;

export const ArtImage = styled.img`
  width: 100%;
  max-height: 450px;
  object-fit: contain;
`;

export const InputContainer = styled.div`
  width: 68%;
  position: relative;

  input {
    width: 100%;
  }

  button {
    position: absolute;
    right: 8px;
    top: 3px;
    background: none;
    border: none;
  }
`;

export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ArtContent = styled.div`
  display: flex;
`;

export const ArtInfo = styled.div`
  flex-grow: 1;
`;

export const ArtistInfo = styled.div`
  text-align: center;
  border-left: 1px solid #e8e8e8;
  padding: 8px 16px;
  min-width: 250px;

  button {
    margin-top: 8px;
  }
`;
