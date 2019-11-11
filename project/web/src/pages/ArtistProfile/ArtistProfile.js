import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ProfileContainer, ArtsContainer, Container } from './styles';
import { ArtContainer, Button, DefinitionList } from '~/ui';
import api from '~/services/api';

const ArtistProfile = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [arts, setArts] = useState([]);

  useEffect(() => {
    function getArtist(artistId) {
      async function getUser() {
        const response = await api.get(`users/${artistId}`);
        setArtist(response.data.data.user);
      }

      async function getArts() {
        const response = await api.get(
          `arts?type=ARTIST_ART&user_id=${artistId}`
        );
        setArts(response.data.data.arts);
      }

      getUser();
      getArts();
    }

    getArtist(id);
  }, [id]);

  return (
    <Container>
      <ProfileContainer>
        {artist && (
          <>
            <Button
              to={`/arts/new/${artist.id}`}
              background="#292C2F"
              as={Link}
            >
              Adicionar Tatuagem
            </Button>

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
          </>
        )}
      </ProfileContainer>

      <ArtsContainer>
        {arts.map(art => (
          <ArtContainer key={art.id}>
            <img src={`http://localhost:3333/${art.path}`} alt={art.title} />
            <div>
              <h3>{art.title}</h3>
              <ul>
                <li>15x20cm</li>
                <li>{art.price}</li>
              </ul>
            </div>
          </ArtContainer>
        ))}
      </ArtsContainer>
    </Container>
  );
};

export default ArtistProfile;
