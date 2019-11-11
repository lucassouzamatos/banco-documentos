import styled from 'styled-components';

const ActionButton = styled.button`
  background: ${({ background }) => background};
  border: none;
  color: #fff;
  padding: 4px 24px;
  border-radius: 16px;
  font-size: 10px;

  + button {
    margin-left: 16px;
  }
`;

export default ActionButton;
