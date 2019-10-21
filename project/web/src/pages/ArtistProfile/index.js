import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { DefinitionList } from '~/components/Styled/DefinitionList';
import { ProfileContainer, ArtsContainer, Container } from './styles';
import { LinkButton } from '~/components/Styled/Button';
import { ArtContainer } from '~/components/Styled/Art';
import api from '~/services/api';

export default function ArtistProfile() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    function getArtist(artistId) {
      async function getUser() {
        const response = await api.get(`users/${artistId}`);
        setArtist(response.data.data.user);
      }

      getUser();
    }

    getArtist(id);
  }, []);

  return (
    <Container>
      <ProfileContainer>
        <LinkButton to="/arts/new" background="#292C2F">
          Adicionar Tatuagem
        </LinkButton>

        {artist && (
          <DefinitionList>
            <dt>Email</dt>
            <dd>{artist.email}</dd>

            <dt>Nome</dt>
            <dd>{artist.username}</dd>

            <dt>Cidade</dt>
            <dd>{artist.city.name}</dd>

            <dt>Estado</dt>
            <dd>{artist.city.name}</dd>

            <dt>Estilo</dt>
            <dd>black work</dd>
          </DefinitionList>
        )}
      </ProfileContainer>

      <ArtsContainer>
        {[0, 1, 2, 3].map(item => (
          <ArtContainer key={item}>
            <img
              src="https://www.tattooja.com.br/img/blog/tatuagem-nos-dedos-saiba-tudo-que-precisa-ideias-inspiradoras-para-tattoo-topo-1720742430.jpg"
              alt="Tattoo"
            />
            <div>
              <h3>Lorem ipsum</h3>
              <ul>
                <li>15x20cm</li>
                <li>R$150,00</li>
              </ul>
            </div>
          </ArtContainer>
        ))}
      </ArtsContainer>
    </Container>
  );
}
