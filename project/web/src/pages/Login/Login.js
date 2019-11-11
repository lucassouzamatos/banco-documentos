import React from 'react';
import { Link } from 'react-router-dom';
import { MdLock, MdMail } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';

import { Container, InputContainer } from './styles';
import { Button, HeaderClient, Input, Title } from '~/ui';
import { signInRequest } from '~/store/modules/auth/actions';

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <HeaderClient />
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
            {loading ? 'Carregando...' : 'Entrar'}
          </Button>

          <Link to="/register">Criar uma conta</Link>
        </Form>
      </Container>
    </>
  );
};

export default Login;
