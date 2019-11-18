import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Form, Select } from '@rocketseat/unform';

import { MdBookmark, MdPlace } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ArtContainer, Button, Container, FormSearch } from '~/ui';
import {
  Avatar,
  ArtInfo,
  ArtistInfo,
  ArtContent,
  ArtImage,
  ArtsContainer,
  BackgroundImage,
  ModalContent,
} from './styles';
import api from '~/services/api';
import { useProfile } from '~/hooks';
import toMoney from '~/utils/to-money';
import toDate from '~/utils/to-date';
import toTime from '~/utils/to-time';

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

const HomeClient = () => {
  const profile = useProfile();
  const [arts, setArts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [detailArt, setDetailArt] = useState({});
  const [availableSchedules, setAvailableSchedules] = useState([]);

  const openModal = art => {
    const loadArt = async () => {
      const response = await api.get(`arts/${art.id}`);

      setDetailArt(response.data.data);
      setIsModalOpen(true);
    };

    const loadAvailableSchedule = async () => {
      const response = await api.get(`schedule-dates?art_id=${art.id}`);
      const { scheduledates } = response.data.data;

      setAvailableSchedules(
        scheduledates.map(schedule => ({
          id: schedule.id,
          title: `${toDate(schedule.date)} - ${toTime(schedule.date)}`,
        }))
      );
    };

    loadArt();
    loadAvailableSchedule();
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
    async function loadArts() {
      const response = await api.get(
        `arts?distance=${data.distance}&title=${
          data.busca
        }&order_by=created_at&order=${data.id === 1 ? 'desc' : 'asc'}`
      );

      setArts(response.data.data.arts);
    }

    loadArts();

    console.log(data);
  };

  const requestSchedule = async data => {
    const { schedule } = data;
    const requestData = {
      customer_id: profile.id,
      schedule_date_id: schedule,
      art_id: detailArt.id,
    };

    try {
      const response = await api.post(`scheduleds`, requestData);
      toast.success('Agendamento solicitado com sucesso');
    } catch (error) {
      toast.error('Houve um erro ao solicitar o agendamento.');
    } finally {
      setIsModalOpen(false);
      setIsScheduleModalOpen(false);
    }
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
          <Form onSubmit={requestSchedule}>
            <Select
              name="schedule"
              label="Horário"
              options={availableSchedules}
            />
            <Button background="#292C2F" type="submit">
              Solicitar
            </Button>
          </Form>
        </Modal>
      </Modal>
      <BackgroundImage />
      <Container>
        <FormSearch handleSubmit={handleSubmit} />

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
