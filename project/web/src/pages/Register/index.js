import React from 'react';

import { Container, RadioContainer } from './styles';
import { Title } from '~/components/Styled/Title';
import { Button } from '~/components/Styled/Button';

import Header from '~/components/Header/Client';
import Input from '~/components/Input';

export default function Login() {
  return (
    <>
      <Header />
      <Container>
        <Title>Cadastro</Title>
        <form>
          <Input id="email" type="email" required label="E-mail" />
          <Input id="password" type="password" required label="Senha" />

          <Input
            id="password-confirmation"
            type="password-confirmation"
            required
            label="Repetir senha"
          />
          <RadioContainer>
            <input type="radio" id="artist" name="type" />
            <label htmlFor="artist">Sou um tatuador</label>
            <input type="radio" id="studio" name="type" />
            <label htmlFor="studio">Sou um estúdio</label>
          </RadioContainer>
          <Input id="address" type="address" required label="Endereço" />
          <Input id="city" type="city" required label="Cidade" />
          <Input id="state" type="state" required label="Estado" />

          <Button background="#292C2F" type="submit">
            Criar conta
          </Button>
        </form>
      </Container>
    </>
  );
}
