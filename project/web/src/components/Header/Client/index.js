import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  MdHome,
  MdPerson,
  MdInsertInvitation,
  MdNotifications,
  MdExplore,
} from 'react-icons/md';

import { Container, MenuButton, Menu } from './styles';
import logo from '~/assets/logo.png';

export default function HeaderClient() {
  const [isMenuOpen, setMenuIsOpen] = useState(false);

  function toggleMenu() {
    setMenuIsOpen(!isMenuOpen);
  }

  return (
    <Container>
      <img src={logo} alt="Inkin Logo" />
      <MenuButton type="button" onClick={toggleMenu}>
        <MdPerson size={24} />
      </MenuButton>
      {isMenuOpen && (
        <Menu>
          <ul>
            <li>
              <a href="#">
                <MdHome size={18} />
                Homepage
              </a>
            </li>
            <li>
              <Link to="profile">
                <MdPerson size={18} />
                Meus dados
              </Link>
            </li>
            <li>
              <a href="#">
                <MdInsertInvitation size={18} />
                Agenda
              </a>
            </li>
            <li>
              <a href="#">
                <MdNotifications size={18} />
                Notificações
              </a>
            </li>
            <li>
              <a href="#">
                <MdExplore size={18} />
                Explorar
              </a>
            </li>
          </ul>
        </Menu>
      )}
    </Container>
  );
}
