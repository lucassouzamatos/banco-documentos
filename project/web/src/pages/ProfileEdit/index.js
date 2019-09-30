import React from 'react';
import { Form } from '@rocketseat/unform';

import { Container } from './styles';
import { Title } from '~/components/Styled/Title';
import { Button } from '~/components/Styled/Button';
import Input from '~/components/Input';

export default function ProfileEdit() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  const initialData = {
    email: 'admin@gmail.com',
    social: 'razao',
    cnpj: '1000.12.21.21',
    address: 'street 123',
    city: 'tuba',
    state: 'SC',
  };

  return (
    <Container>
      <Title>Dados</Title>
      <Form onSubmit={handleSubmit} initialData={initialData}>
        <Input id="email" type="email" required label="E-mail" />
        <Input id="social" type="text" required label="Razão Social" />
        <Input id="cnpj" type="text" required label="CNPJ" />
        <Input id="address" type="text" required label="Endereço" />
        <Input id="city" type="text" required label="Cidade" />
        <Input id="state" type="text" required label="Estado" />

        <Button background="#292C2F" type="submit">
          Salvar
        </Button>
      </Form>
    </Container>
  );
}
