import React from 'react';
import { Link } from 'react-router-dom';
import { MdLock, MdMail } from 'react-icons/md';
import { Form } from '@rocketseat/unform';

import { Container, InputContainer } from './styles';
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
        <Title>Entrar</Title>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <MdMail size={21} />
            <Input id="email" type="email" required label="E-mail" />
          </InputContainer>

          <InputContainer>
            <MdLock size={21} />
            <Input id="password" type="password" required label="Senha" />
          </InputContainer>

          <Button background="#292C2F" type="submit">
            Entrar
          </Button>

          <Link to="/register">Criar uma conta</Link>
        </Form>
      </Container>
    </>
  );
}
