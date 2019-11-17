import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Form, Select } from '@rocketseat/unform';
import SearchInput from '~/ui/SearchInput';

const distance = [
  {
    id: 10,
    title: '10km',
  },
  {
    id: 20,
    title: '20km',
  },
  {
    id: 30,
    title: '30km',
  },
];

const sort = [
  {
    id: 1,
    title: 'Mais recente',
  },
  {
    id: 2,
    title: 'Mais antigas',
  },
];

const initialData = {
  distance: 1,
  sort: 1,
};

const FormSearch = ({ handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit} initialData={initialData}>
      <FormContainer>
        <SearchInput />
        <Select name="distance" label="" options={distance} />
        <Select name="sort" label="" options={sort} />
      </FormContainer>
    </Form>
  );
};

FormSearch.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export const FormContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 16px 0;
  justify-content: space-between;

  input {
    border-radius: 30px;
    border: 1px solid #95989a;
    padding: 4px 16px;
  }

  select {
    width: 15%;
    margin: 0;
  }
`;

export default FormSearch;
