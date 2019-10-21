import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MdHome,
  MdPerson,
  MdInsertInvitation,
  MdNotifications,
  MdPeople,
  MdExplore,
} from 'react-icons/md';

import { Container } from './styles';

export default function HeaderArtist() {
  const role = useSelector(state => state.user.profile.role);

  return (
    <Container>
      <nav>
        <ul>
          <li>
            <Link to="/artists">
              <MdHome size={21} /> Home Page
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <MdPerson size={21} />
              {role === 'ARTIST' ? 'Perfil' : 'Estúdio'}
            </Link>
          </li>
          {role === 'STUDIO' && (
            <li>
              <Link to="/artists">
                <MdPeople size={21} />
                Tatuadores
              </Link>
            </li>
          )}

          {role === 'ARTIST' && (
            <li>
              <Link to="/profile">
                <MdInsertInvitation size={21} />
                Agenda
              </Link>
            </li>
          )}

          {role === 'STUDIO' && (
            <li>
              <Link to="/profile">
                <MdExplore size={21} />
                Explorar
              </Link>
            </li>
          )}

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
