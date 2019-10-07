import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  width: 100%;
`;

export const Artist = styled.div`
  padding: 16px;
  max-width: 230px;
  text-align: center;

  img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    object-fit: cover;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ContainerFlex = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: 200px;
  }
`;
