import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { useSelector } from 'react-redux';
import { MdBookmark, MdPlace } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { Container, Artist, ContainerFlex, HeaderContainer } from './styles';
import { Title } from '~/components/Styled/Title';
import { Button } from '~/components/Styled/Button';

Modal.setAppElement('#root');

export default function ArtistList() {
  const [artists, setArtists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profile = useSelector(state => state.user.profile);
  const [users, setUsers] = useState([]);

  function addArtist(user) {
    async function linkUser() {
      try {
        await api.post(`studio-artists`, {
          studio_id: profile.id,
          artist_id: user.id,
        });

        setArtists([...artists, { artist: user }]);
        toast.success('Artista vinculado com sucesso!');
      } catch (error) {
        if (error.response.data.errors) {
          const errorsMessage = error.response.data.errors.reduce(
            (accumulator, errorMessage) => accumulator + errorMessage,
            ''
          );

          toast.error(errorsMessage);
          return;
        }

        toast.error('Erro ao vincular artista.');
      }
    }

    linkUser();
  }

  useEffect(() => {
    async function loadArtists() {
      const response = await api.get(`studio-artists/${profile.id}`);

      setArtists(response.data.data);
    }
    loadArtists();
  }, []);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get(`users?role=ARTIST`);

      setUsers(
        response.data.data.users.filter(user => {
          return !artists.some(artist => {
            return artist.artist.id === user.id;
          });
        })
      );
    }

    loadUsers();
  }, [artists]);

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <Container>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Vincular tatuador"
      >
        <ContainerFlex>
          {users.map(user => (
            <Artist to={`/artist/${user.id}`} key={user.id}>
              <img
                src="https://protagonistas.co/wp-content/uploads/2019/03/negocio-de-tatuagem.jpg"
                alt=""
              />
              <h2>{user.username}</h2>
              <ul>
                <li>{<MdBookmark size={16} />} black work</li>
                <li>
                  {<MdPlace size={16} />}
                  {user.city.name}, {user.city.state.uf}
                </li>
              </ul>
              <Button
                background="#D9A327"
                type="button"
                onClick={() => addArtist(user)}
              >
                Vincular
              </Button>
            </Artist>
          ))}
        </ContainerFlex>
      </Modal>

      <HeaderContainer>
        <Title>Tatuadores</Title>
        <Button
          type="button"
          background="#D9A327"
          onClick={() => setIsModalOpen(true)}
        >
          Cadastrar
        </Button>
      </HeaderContainer>

      <ContainerFlex>
        {artists.map(artist => (
          <Artist to={`/artist/${artist.artist.id}`} key={artist.id}>
            <img
              src="https://protagonistas.co/wp-content/uploads/2019/03/negocio-de-tatuagem.jpg"
              alt=""
            />
            <h2>{artist.artist.username}</h2>
            <ul>
              <li>{<MdBookmark size={16} />} black work</li>
              <li>
                {<MdPlace size={16} />}
                {artist.artist.city.name}, {artist.artist.city.state.uf}
              </li>
            </ul>
          </Artist>
        ))}
      </ContainerFlex>
    </Container>
  );
}
