import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, DefinitionList, Title } from '~/ui';

import { signOut } from '~/store/modules/auth/actions';
import { Container, H3, StyleItem, StyleContainer } from './styles';
import api, { host } from '~/services/api';
import { useProfile } from '~/hooks';

const Profile = () => {
  const profile = useProfile();
  const dispatch = useDispatch();
  const [artistStyles, setArtistStyles] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const loadStyles = async () => {
      const response = await api.get(`artist-styles?user_id=${profile.id}`);

      setArtistStyles(response.data.data.artistStyles);
    };

    if (profile.avatar) {
      setImagePreview(`${host}/${profile.avatar}`);
    }

    loadStyles();
  }, [profile]);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Title>Dados</Title>

      {imagePreview && <img src={imagePreview} alt="Tattoo" />}

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
          </>
        )}

        <>
          <dt>Endereço</dt>
          <dd>{profile.address}</dd>

          <dt>Cidade</dt>
          <dd>{profile.city.name}</dd>

          <dt>Estado</dt>
          <dd>lorem ipsum</dd>
        </>
      </DefinitionList>

      {profile.role === 'ARTIST' && (
        <>
          <H3>Estilos</H3>
          <StyleContainer>
            {artistStyles.map(artistStyle => (
              <StyleItem key={artistStyle.style.id}>
                {artistStyle.style.title}
              </StyleItem>
            ))}
          </StyleContainer>
        </>
      )}

      <Button to="/profile/edit" background="#D9A327" as={Link}>
        Editar
      </Button>

      <Button background="#292C2F" onClick={handleSignOut}>
        Sair
      </Button>
    </Container>
  );
};

export default Profile;
