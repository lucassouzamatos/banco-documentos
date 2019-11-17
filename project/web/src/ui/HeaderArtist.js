import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  MdHome,
  MdPerson,
  MdInsertInvitation,
  MdNotifications,
  MdPeople,
  MdExplore,
} from 'react-icons/md';
import { useProfile } from '~/hooks';

const HeaderArtist = () => {
  const { role } = useProfile();

  return (
    <Container>
      <nav>
        <ul>
          <li>
            {role === 'ARTIST' && (
              <Link to="/arts">
                <MdHome size={21} /> Home Page
              </Link>
            )}
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
              <Link to="/schedule">
                <MdInsertInvitation size={21} />
                Agenda
              </Link>
            </li>
          )}

          {role === 'STUDIO' && (
            <li>
              <Link to="/explore">
                <MdExplore size={21} />
                Explorar
              </Link>
            </li>
          )}

          <li>
            <Link to="/notifications">
              <MdNotifications size={21} />
              Notificações
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export const Container = styled.div`
  background: #292c2f;
  min-height: 100vh;
  min-width: 230px;

  nav {
    padding-top: 16px;
  }

  a {
    font-family: Tahoma, sans-serif;
    color: #95989a;
    display: block;
    padding: 12px;
    transition: all 0.25s;
    display: flex;
    align-items: center;

    &:hover {
      background: #d9a327;
      color: #fff;
    }

    svg {
      margin-right: 8px;
    }
  }
`;

export default HeaderArtist;
