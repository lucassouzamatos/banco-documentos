import React from 'react';
import styled from 'styled-components';
import { Input } from '@rocketseat/unform';
import { MdSearch } from 'react-icons/md';

const SearchInput = () => (
  <InputContainer>
    <Input name="busca" placeholder="Buscar" />
    <button type="submit">
      <MdSearch size={20} />
    </button>
  </InputContainer>
);

const InputContainer = styled.div`
  width: 68%;
  position: relative;

  input {
    width: 100%;
    border-radius: 30px;
    border: 1px solid #95989a;
    padding: 4px 16px;
  }

  button {
    position: absolute;
    right: 8px;
    top: 3px;
    background: none;
    border: none;
    width: 20px;
  }
`;

export default SearchInput;
