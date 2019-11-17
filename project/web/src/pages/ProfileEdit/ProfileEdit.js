import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@rocketseat/unform';

import { Container } from './styles';
import { Button, Input, StyleSelector, Title } from '~/ui';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { useProfile } from '~/hooks';
import api, { host } from '~/services/api';
import defaultImage from '~/assets/default.jpg';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const profile = useProfile();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(
    profile.city && profile.city.state_id ? profile.city.state_id : null
  );
  const [selectedCity, setSelectedCity] = useState(
    profile.city ? profile.city.id : null
  );

  async function loadCities(stateId) {
    const response = await api.get(`cities?state_id=${stateId}`);

    setCities(
      response.data.data.cities.map(city => ({
        title: city.name,
        id: city.id,
      }))
    );
  }

  useEffect(() => {
    async function loadStates() {
      const response = await api.get(`states`);

      setStates(
        response.data.data.states.map(state => ({
          title: state.name,
          id: state.id,
        }))
      );

      if (profile.city.state_id) {
        loadCities(profile.city.state_id);
      }
    }

    loadStates();
  }, [profile]);

  useEffect(() => {
    if (profile.avatar) {
      setImagePreview(`${host}/${profile.avatar}`);
      return;
    }

    setImagePreview(defaultImage);
  }, [profile.avatar]);

  const handleOnChangeState = stateId => {
    setSelectedState(stateId);

    loadCities(stateId);
  };

  const handleOnChangeCity = cityId => {
    setSelectedCity(cityId);
  };

  function handleSubmit(data) {
    const formData = new FormData();
    Object.keys(data).forEach(item => {
      formData.append(item, data[item]);
    });

    formData.append('city_id', selectedCity);
    formData.append('image', image);
    formData.append('id', profile.id);

    dispatch(updateProfileRequest(formData));
  }

  const initialData = {
    email: profile.email,
    username: profile.username,
    cpf: profile.cpf,
    cnpj: profile.cnpj,
    address: profile.address,
    city_id: null,
    state: null,
  };

  function onChangeFile(e) {
    const [file] = e.target.files;

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  return (
    <Container>
      <Title>Editar Dados</Title>
      <Form onSubmit={handleSubmit} initialData={initialData}>
        {imagePreview && <img src={imagePreview} alt="Tattoo" />}

        <input id="image" type="file" onChange={onChangeFile} />
        <Button background="#D9A327" htmlFor="image" as="label">
          Carregar
        </Button>

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
        <label htmlFor="state">Estado</label>
        <select
          id="state"
          required
          name="state"
          onChange={e => handleOnChangeState(e.target.value)}
          value={selectedState}
        >
          <option>Selecione o estado</option>
          {states.map(state => (
            <option value={state.id} key={state.id}>
              {state.title}
            </option>
          ))}
        </select>
        <label htmlFor="city">Cidade</label>
        <select
          id="city"
          required
          options={cities}
          onChange={e => handleOnChangeCity(e.target.value)}
          value={selectedCity}
        >
          <option value>Selecione a cidade</option>
          {cities.map(city => (
            <option value={city.id} key={city.id}>
              {city.title}
            </option>
          ))}
        </select>

        {profile.role === 'ARTIST' && <StyleSelector />}
        {profile.role === 'CUSTOMER' && <StyleSelector type="interests" />}

        <Button background="#292C2F" type="submit">
          Salvar
        </Button>
      </Form>
    </Container>
  );
};

export default ProfileEdit;
