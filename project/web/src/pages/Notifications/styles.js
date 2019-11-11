import styled from 'styled-components';

export const Notification = styled.div`
  border: 1px solid #e3e3e3;
  border-left: 8px solid ${({ isDeny }) => (isDeny ? '#9F2020' : '#299f20')};
  border-left-color: ${({ read }) => (read ? '#D5D5D5' : '')};
  padding: 8px;

  & + div {
    margin-top: 8px;
  }

  p {
    color: #95989a;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const ButtonMarkRead = styled.button`
  border: none;
  background: none;
  font-size: 10px;
  color: #929292;
  text-transform: uppercase;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 8px;
`;
