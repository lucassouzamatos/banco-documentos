import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { FlexContainer } from './styles';
import { ArtContainer, Button, Container, HeaderContainer, Title } from '~/ui';
import api, { host } from '~/services/api';
import toMoney from '~/utils/to-money';

const ArtList = () => {
  const profile = useSelector(state => state.user.profile);
  const [arts, setArts] = useState([]);

  useEffect(() => {
    async function loadArts() {
      const response = await api.get(`arts?user_id=${profile.id}`);

      setArts(
        response.data.data.arts.map(art => {
          return {
            ...art,
            formattedPrice: toMoney(art.price),
          };
        })
      );
    }

    loadArts();
  }, [profile.id]);

  return (
    <Container>
      <HeaderContainer>
        <Title>Minhas artes</Title>
        <Button to="/arts/new" background="#D9A327" as={Link}>
          Adicionar
        </Button>
      </HeaderContainer>

      <FlexContainer>
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
