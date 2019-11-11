import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  MdHome,
  MdPerson,
  MdInsertInvitation,
  MdNotifications,
  MdExplore,
} from 'react-icons/md';

import logo from '~/assets/logo.png';

const HeaderClient = () => {
  const [isMenuOpen, setMenuIsOpen] = useState(false);
  const signed = useSelector(state => state.auth.signed);

  function toggleMenu() {
    setMenuIsOpen(!isMenuOpen);
  }

  return (
    <Container>
      <img src={logo} alt="Inkin Logo" />
      {signed && (
        <MenuButton type="button" onClick={toggleMenu}>
          <MdPerson size={24} />
        </MenuButton>
      )}
      {isMenuOpen && (
        <Menu>
          <ul>
            <li>
              <Link to="/">
                <MdHome size={18} />
                Homepage
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <MdPerson size={18} />
                Meus dados
              </Link>
            </li>
            <li>
              <Link to="/schedule">
                <MdInsertInvitation size={18} />
                Agenda
              </Link>
            </li>
            <li>
              <Link to="/notifications">
                <MdNotifications size={18} />
                Notificações
              </Link>
            </li>
            <li>
              <Link to="/">
                <MdExplore size={18} />
                Explorar
              </Link>
            </li>
          </ul>
        </Menu>
      )}
    </Container>
  );
};

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

export default HeaderClient;
