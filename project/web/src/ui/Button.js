import styled from 'styled-components';

const Button = styled.button`
  font-size: 16px;
  font-weight: bold;
  background: ${props => props.background};
  color: #fff;
  border: none;
  padding: 12px 24px;
  display: block;
  width: 100%;
  text-transform: uppercase;
  border-radius: 80px;
  text-align: center;
  cursor: pointer;
`;

export default Button;
