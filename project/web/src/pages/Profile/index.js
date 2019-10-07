import React from 'react';
import { useSelector } from 'react-redux';

import { Title } from '~/components/Styled/Title';
import { DefinitionList } from '~/components/Styled/DefinitionList';

import { Container } from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);

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

        <dt>Endereço</dt>
        <dd>{profile.address}</dd>

        <dt>Cidade</dt>
        <dd>{profile.city_id}</dd>

        <dt>Estado</dt>
        <dd>lorem ipsum</dd>
      </DefinitionList>
    </Container>
  );
}
