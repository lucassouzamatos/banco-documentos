import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, DefinitionList, Title } from '~/ui';

import { signOut } from '~/store/modules/auth/actions';
import { Container } from './styles';
import api from '~/services/api';

const Profile = () => {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const [artistStyles, setArtistStyles] = useState([]);

  useEffect(() => {
    const loadStyles = async () => {
      const response = await api.get(`artist-styles?user_id=${profile.id}`);

      setArtistStyles(response.data.data.artistStyles);
    };

    loadStyles();
  }, [profile.id]);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Title>Dados</Title>

      <DefinitionList>
        <dt>Email</dt>
        <dd>{profile.email}</dd>

        <dt>{profile.role === 'STUDIO' ? 'Razão Social' : 'Nome'}</dt>
        <dd>{profile.username}</dd>

        {profile.role === 'STUDIO' && (
          <>
            <dt>CNPJ</dt>
            <dd>{profile.cnpj}</dd>
          </>
        )}

        {profile.role === 'ARTIST' && (
          <>
            <dt>CPF</dt>
            <dd>{profile.cpf}</dd>

            <dt>Estilos</dt>
            {artistStyles.map(artistStyle => (
              <dd>{artistStyle.style.title}</dd>
            ))}
          </>
        )}

        {profile.role !== 'CUSTOMER' && (
          <>
            <dt>Endereço</dt>
            <dd>{profile.address}</dd>

            <dt>Cidade</dt>
            <dd>{profile.city_id}</dd>

            <dt>Estado</dt>
            <dd>lorem ipsum</dd>
          </>
        )}
      </DefinitionList>

      {profile.role !== 'CUSTOMER' && (
        <Button to="/profile/edit" background="#D9A327" as={Link}>
          Editar
        </Button>
      )}

      <Button background="#292C2F" onClick={handleSignOut}>
        Sair
      </Button>
    </Container>
  );
};

export default Profile;
