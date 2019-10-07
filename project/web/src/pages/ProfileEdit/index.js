import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Select } from '@rocketseat/unform';

import { Container } from './styles';
import { Title } from '~/components/Styled/Title';
import { Button } from '~/components/Styled/Button';
import Input from '~/components/Input';

import { updateProfileRequest } from '~/store/modules/user/actions';

const states = [{ id: 1, title: 'Santa Catarina' }];
const cities = [{ id: 1, title: 'Tubarão' }];

export default function ProfileEdit() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest({ ...data, id: profile.id }));
  }

  const initialData = {
    email: profile.email,
    username: profile.username,
    cpf: profile.cpf,
    cnpj: profile.cnpj,
    address: profile.address,
    city_id: profile.city_id,
    state: 'SC',
  };

  return (
    <Container>
      <Title>Editar Dados</Title>
      <Form onSubmit={handleSubmit} initialData={initialData}>
        <Input id="email" type="email" required label="E-mail" />
        <Input
          id="username"
          type="text"
          required
          label={profile.role === 'ARTIST' ? 'Nome' : 'Razão Social'}
        />
        {profile.role === 'STUDIO' && (
          <Input id="cnpj" type="text" required label="CNPJ" />
        )}
        {profile.role === 'ARTIST' && (
          <Input id="cpf" type="text" required label="CPF" />
        )}
        <Input id="address" type="text" required label="Endereço" />
        <Select name="state" label="Estado" options={states} />
        <Select name="city_id" label="Cidade" options={cities} />

        <Button background="#292C2F" type="submit">
          Salvar
        </Button>
      </Form>
    </Container>
  );
}
