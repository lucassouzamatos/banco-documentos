import React from 'react';

import { Container } from './styles';
import { Title } from '~/components/Styled/Title';
import { Button } from '~/components/Styled/Button';
import Input from '~/components/Input';

export default function ProfileEdit() {
  return (
    <Container>
      <Title>Dados</Title>
      <Input id="email" type="email" required label="E-mail" />
      <Input id="social" type="social" required label="Razão Social" />
      <Input id="cnpj" type="cnpj" required label="CNPJ" />
      <Input id="address" type="address" required label="Endereço" />
      <Input id="city" type="city" required label="Cidade" />
      <Input id="state" type="state" required label="Estado" />

      <Button background="#292C2F" type="submit">
        Salvar
      </Button>
    </Container>
  );
}
