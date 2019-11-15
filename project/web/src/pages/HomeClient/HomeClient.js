import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { Form, Select } from '@rocketseat/unform';

import { ArtContainer, Button, Container } from '~/ui';
import { ArtsContainer, BackgroundImage, ModalContent } from './styles';
import api from '~/services/api';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: '400px',
    height: '250px',
    left: '50%',
    top: '50%',
  },
};

const HomeClient = () => {
  const profile = useSelector(state => state.user.profile);
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

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Detalhes arte"
      >
        {detailArt && detailArt.user && (
          <ModalContent>
            <img
              src={`http://localhost:3333/${detailArt.path}`}
              alt={detailArt.title}
            />
            <div>
              <h3>{detailArt.title}</h3>
              <p>{detailArt.description}</p>
            </div>
            <div>
              <img
                src={`http://localhost:3333/${detailArt.user.path}`}
                alt={detailArt.user.username}
              />
              <h4>{detailArt.user.city.name}</h4>
              <Button
                background="#D9A327"
                onClick={() => setIsScheduleModalOpen(true)}
              >
                Agendar
              </Button>
            </div>
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
        <ArtsContainer>
          {arts.map(art => (
            <ArtContainer key={art.id} onClick={() => openModal(art)}>
              <img src={`http://localhost:3333/${art.path}`} alt={art.title} />
              <div>
                <h3>{art.title}</h3>
                <ul>
                  <li>{art.dimensions}</li>
                  <li>{art.price}</li>
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
