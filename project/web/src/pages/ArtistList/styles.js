import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Artist = styled(Link)`
  padding: 16px;
  max-width: 230px;
  text-align: center;
  color: #414141;

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
