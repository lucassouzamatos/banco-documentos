import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Title } from '~/components/Styled/Title';
import { DefinitionList } from '~/components/Styled/DefinitionList';
import { Button, LinkButton } from '~/components/Styled/Button';

import { signOut } from '~/store/modules/auth/actions';
import { Container } from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

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
        <LinkButton to="/profile/edit" background="#D9A327">
          Editar
        </LinkButton>
      )}

      <Button background="#292C2F" onClick={handleSignOut}>
        Sair
      </Button>
    </Container>
  );
}
