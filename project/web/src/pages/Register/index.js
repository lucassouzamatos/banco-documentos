import React from 'react';
import { Form, Choice } from '@rocketseat/unform';

import { Container, RadioContainer } from './styles';
import { Title } from '~/components/Styled/Title';
import { Button } from '~/components/Styled/Button';

import Header from '~/components/Header/Client';
import Input from '~/components/Input';

export default function Login() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <Header />
      <Container>
        <Title>Cadastro</Title>
        <Form onSubmit={handleSubmit}>
          <Input id="email" type="email" required label="E-mail" />
          <Input id="password" type="password" required label="Senha" />

          <Input
            id="password-confirmation"
            type="text"
            required
            label="Repetir senha"
          />
          <RadioContainer>
            <Choice
              name="fieldName"
              options={[
                { value: 'artist', label: 'Sou um tatuador' },
                { value: 'studio', label: 'Sou um estúdio' },
              ]}
            />
          </RadioContainer>
          <Input id="address" type="text" required label="Endereço" />
          <Input id="city" type="text" required label="Cidade" />
          <Input id="state" type="text" required label="Estado" />

          <Button background="#292C2F" type="submit">
            Criar conta
          </Button>
        </Form>
      </Container>
    </>
  );
}
