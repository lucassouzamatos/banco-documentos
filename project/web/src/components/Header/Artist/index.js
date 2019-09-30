import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdHome,
  MdPerson,
  MdInsertInvitation,
  MdNotifications,
} from 'react-icons/md';

import { Container } from './styles';

export default function HeaderArtist() {
  return (
    <Container>
      <nav>
        <ul>
          <li>
            <Link to="/profile">
              <MdHome size={21} /> Home Page
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <MdPerson size={21} />
              Perfil
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <MdInsertInvitation size={21} />
              Agenda
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <MdNotifications size={21} />
              Notificações
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
