import styled from 'styled-components';

export const Container = styled.header`
  background: #292c2f;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: #fff;
`;

export const Menu = styled.div`
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 15px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 8px solid #3b444e;
  }

  background: #3b444e;
  position: absolute;
  right: 0;
  top: 55px;

  a {
    display: flex;
    color: #95989a;
    padding: 8px 16px;

    svg {
      margin-right: 8px;
    }
  }
`;
