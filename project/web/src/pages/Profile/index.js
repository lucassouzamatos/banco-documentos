import React from 'react';

import { Title } from '~/components/Styled/Title';
import { DefinitionList } from '~/components/Styled/DefinitionList';

import { Container } from './styles';

export default function Profile() {
  return (
    <Container>
      <Title>Dados</Title>

      <DefinitionList>
        <dt>Email</dt>
        <dd>lorem@gmail.com</dd>

        <dt>Razão Social</dt>
        <dd>lorem ipsum</dd>

        <dt>CNPJ</dt>
        <dd>lorem ipsum</dd>

        <dt>Endereço</dt>
        <dd>lorem ipsum</dd>

        <dt>Cidade</dt>
        <dd>lorem ipsum</dd>

        <dt>Estado</dt>
        <dd>lorem ipsum</dd>
      </DefinitionList>
    </Container>
  );
}
