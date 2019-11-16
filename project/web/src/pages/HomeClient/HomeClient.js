import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Form, Select } from '@rocketseat/unform';

import { MdBookmark, MdPlace } from 'react-icons/md';
import { ArtContainer, Button, Container, SearchInput } from '~/ui';
import {
  Avatar,
  ArtInfo,
  ArtistInfo,
  ArtContent,
  ArtImage,
  ArtsContainer,
  BackgroundImage,
  FormContainer,
  ModalContent,
} from './styles';
import api from '~/services/api';
import { useProfile } from '~/hooks';
import toMoney from '~/utils/to-money';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: '360px',
    height: '160px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.75)',
  },
};

const distance = [
  {
    id: 1,
    title: '1km',
  },
  {
    id: 2,
    title: '2km',
  },
  {
    id: 3,
    title: '3km',
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

const HomeClient = () => {
  const profile = useProfile();
  const [arts, setArts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [detailArt, setDetailArt] = useState({});

  const schedules = [
    {
      id: 1,
      title: '10 de dezembro de 2019',
    },
  ];

  const openModal = art => {
    const loadArt = async () => {
      const response = await api.get(`arts/${art.id}`);

      setDetailArt(response.data.data);
      setIsModalOpen(true);
    };

    loadArt();
  };

  useEffect(() => {
    async function loadArts() {
      const response = await api.get(`arts`);

      setArts(response.data.data.arts);
    }

    loadArts();
  }, [profile.id]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };

  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Detalhes arte"
        style={{ overlay: { background: 'rgba(0, 0, 0, 0.75)' } }}
      >
        {detailArt && detailArt.user && (
          <ModalContent>
            <ArtImage
              src={`http://localhost:3333/${detailArt.path}`}
              alt={detailArt.title}
            />
            <ArtContent>
              <ArtInfo>
                <h3>{detailArt.title}</h3>
                <p>{detailArt.description}</p>
              </ArtInfo>
              <ArtistInfo>
                <Avatar
                  src={`http://localhost:3333/${detailArt.user.avatar}`}
                  alt={detailArt.user.username}
                />
                <ul>
                  <li>
                    <MdBookmark size={16} />
                    {detailArt.style.title}
                  </li>
                  <li>
                    <MdPlace size={16} />
                    {detailArt.user.city.name}, {detailArt.user.city.state.name}
                  </li>
                </ul>
                <Button
                  background="#D9A327"
                  onClick={() => setIsScheduleModalOpen(true)}
                >
                  Agendar
                </Button>
              </ArtistInfo>
            </ArtContent>
          </ModalContent>
        )}
        <Modal
          isOpen={isScheduleModalOpen}
          onRequestClose={closeScheduleModal}
          contentLabel="Agendamento"
          style={customStyles}
        >
          <h3>Selecione um horário</h3>
          <Form>
            <Select name="schedules" label="Horário" options={schedules} />
          </Form>
          <Button background="#292C2F">Solicitar</Button>
        </Modal>
      </Modal>
      <BackgroundImage />
      <Container>
        <Form onSubmit={handleSubmit} initialData={initialData}>
          <FormContainer>
            <SearchInput />
            <Select name="distance" label="" options={distance} />
            <Select name="sort" label="" options={sort} />
          </FormContainer>
        </Form>

        <ArtsContainer>
          {arts.map(art => (
            <ArtContainer key={art.id} onClick={() => openModal(art)}>
              <img src={`http://localhost:3333/${art.path}`} alt={art.title} />
              <div>
                <h3>{art.title}</h3>
                <ul>
                  <li>{art.dimensions}</li>
                  <li>{toMoney(art.price)}</li>
                </ul>
              </div>
            </ArtContainer>
          ))}
        </ArtsContainer>
      </Container>
    </>
  );
};

export default HomeClient;
