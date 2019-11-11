import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Choice, Select } from '@rocketseat/unform';

import { Container, RadioContainer } from './styles';
import { Button, HeaderClient, Input, Title } from '~/ui';

import { signUpRequest } from '~/store/modules/auth/actions';

import api from '~/services/api';

const Register = () => {
  const dispatch = useDispatch();
  const initialData = {
    role: 'ARTIST',
  };
  const [role, setRole] = useState('ARTIST');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function loadArtists() {
      const response = await api.get(`states`);

      setStates(
        response.data.data.states.map(state => ({
          title: state.name,
          id: state.id,
        }))
      );
    }
    loadArtists();
  }, []);

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

  function handleOnChangeState(state) {
    async function loadCities() {
      const response = await api.get(`cities?state_id=${state}`);

      setCities(
        response.data.data.cities.map(city => ({
          title: city.name,
          id: city.id,
        }))
      );
    }
    loadCities();
  }

  return (
    <>
      <HeaderClient />
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
          <Select
            name="state"
            label="Estado"
            options={states}
            onChange={e => handleOnChangeState(e.target.value)}
          />
          <Select name="city_id" label="Cidade" options={cities} />

          <Button background="#292C2F" type="submit">
            Criar conta
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Register;
