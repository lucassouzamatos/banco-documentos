import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Choice, Select } from '@rocketseat/unform';

import { Container, RadioContainer } from './styles';
import { Title } from '~/components/Styled/Title';
import { Button } from '~/components/Styled/Button';

import Header from '~/components/Header/Client';
import Input from '~/components/Input';

import { signUpRequest } from '~/store/modules/auth/actions';

const states = [{ id: 1, title: 'Santa Catarina' }];
const cities = [{ id: 1, title: 'Tubarão' }];

export default function Login() {
  const dispatch = useDispatch();
  const initialData = {
    role: 'ARTIST',
  };
  const [role, setRole] = useState('ARTIST');

  function handleSubmit({
    username,
    email,
    cpf,
    cnpj,
    password,
    role,
    address,
    city_id,
  }) {
    dispatch(
      signUpRequest(
        username,
        email,
        cpf,
        cnpj,
        password,
        role,
        address,
        city_id
      )
    );
  }

  return (
    <>
      <Header />
      <Container>
        <Title>Cadastro</Title>
        <Form onSubmit={handleSubmit} initialData={initialData}>
          <RadioContainer>
            <Choice
              name="role"
              onChange={e => setRole(e.target.value)}
              options={[
                { value: 'ARTIST', label: 'Sou um tatuador' },
                { value: 'STUDIO', label: 'Sou um estúdio' },
              ]}
            />
          </RadioContainer>

          <Input
            id="username"
            type="text"
            required
            label={role === 'ARTIST' ? 'Nome' : 'Razão Social'}
          />
          {role === 'ARTIST' && (
            <Input id="cpf" type="cpf" required label="CPF" />
          )}

          {role === 'STUDIO' && (
            <Input id="cnpj" type="cnpj" required label="CNPJ" />
          )}

          <Input id="email" type="email" required label="E-mail" />
          <Input id="password" type="password" required label="Senha" />
          <Input id="address" type="text" required label="Endereço" />
          <Select name="state" label="Estado" options={states} />
          <Select name="city_id" label="Cidade" options={cities} />

          <Button background="#292C2F" type="submit">
            Criar conta
          </Button>
        </Form>
      </Container>
    </>
  );
}
