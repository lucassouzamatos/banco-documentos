import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';

import { FlexContainer, HeaderSearch } from './styles';
import {
  ArtContainer,
  Button,
  Container,
  HeaderContainer,
  SearchInput,
  Title,
} from '~/ui';
import api, { host } from '~/services/api';
import toMoney from '~/utils/to-money';
import { useProfile } from '~/hooks';

const ArtList = () => {
  const profile = useProfile();
  const [arts, setArts] = useState([]);

  const loadArts = useCallback(
    async (title = '') => {
      const response = await api.get(
        `arts?user_id=${profile.id}&title=${title}`
      );

      setArts(
        response.data.data.arts.map(art => {
          return {
            ...art,
            formattedPrice: toMoney(art.price),
          };
        })
      );
    },
    [profile.id]
  );

  useEffect(() => {
    loadArts();
  }, [loadArts]);

  const handleSubmit = data => {
    loadArts(data.busca);
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderSearch>
          <Title>Minhas artes</Title>
          <Form onSubmit={handleSubmit}>
            <SearchInput />
          </Form>
        </HeaderSearch>
        <Button to="/arts/new" background="#D9A327" as={Link}>
          Adicionar
        </Button>
      </HeaderContainer>

      <FlexContainer>
        {arts.length === 0 && <p>Nenhuma arte cadastrada.</p>}
        {arts.map(art => (
          <ArtContainer key={art.id}>
            <img src={`${host}/${art.path}`} alt="Tattoo" />
            <div>
              <h3>{art.title}</h3>
              <ul>
                <li>{art.dimensions}</li>
                <li>{art.formattedPrice}</li>
              </ul>
            </div>
          </ArtContainer>
        ))}
      </FlexContainer>
    </Container>
  );
};

export default ArtList;
