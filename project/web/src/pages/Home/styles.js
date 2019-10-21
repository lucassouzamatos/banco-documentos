import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
`;

export const LinkButton = styled(Link)`
  display: block;
  flex: 1;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  background: ${props => props.background};
  font-size: 22px;
  padding: 24px 0;
  font-weight: bold;
`;

export const Button = styled.button`
  display: block;
  flex: 1;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  background: ${props => props.background};
  font-size: 22px;
  padding: 24px 0;
  font-weight: bold;
  border: none;
`;
