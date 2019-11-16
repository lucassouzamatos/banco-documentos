import React, { useState, useEffect } from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Modal from 'react-modal';
import { Form } from '@rocketseat/unform';

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ActionButton, Button, Container, Input, Title } from '~/ui';
import api from '~/services/api';
import toDate from '~/utils/to-date';
import toTime from '~/utils/to-time';

import {
  ButtonContainer,
  ButtonBack,
  ButtonNext,
  ContainerFlex,
  RemoveButton,
  ScheduleContainer,
  ScheduleItem,
  ScheduleRequest,
  SliderContainer,
} from './styles';
import { useProfile } from '~/hooks';

Modal.setAppElement('#root');

const Schedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedule, setSchedule] = useState({});
  const profile = useProfile();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async data => {
    try {
      await api.post(`schedule-dates`, {
        date: `${data.date} ${data.time}`,
        schedule_id: schedule.id,
      });

      toast.success('Horário adicionado com sucesso');
    } catch (error) {
      toast.error('Erro ao adicionar horário');
    } finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get(`schedules/user/${profile.id}`);

      setSchedule(response.data.data);
    }

    loadSchedule();
  }, [profile.id]);

  return (
    <Container>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Adicionar Horário"
      >
        <h1>Adicionar horário</h1>
        <Form onSubmit={handleSubmit}>
          <Input id="time" type="time" required label="Horário" />
          <Input id="date" type="date" required label="Data" />

          <Button type="submit" background="#292C2F">
            Adicionar
          </Button>
        </Form>
      </Modal>
      <Title>Agenda</Title>
      <CarouselProvider
        visibleSlides={3}
        totalSlides={11}
        step={3}
        naturalSlideWidth={100}
        naturalSlideHeight={40}
      >
        <SliderContainer>
          <Slider>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => (
              <Slide key={index} index={index}>
                <ScheduleRequest>
                  <ContainerFlex>
                    <img
                      src="https://protagonistas.co/wp-content/uploads/2019/03/negocio-de-tatuagem.jpg"
                      alt=""
                    />
                    <p>
                      João solicitou um agendamento para o dia 01/09/2019 para a
                      tatuagem Morty
                    </p>
                  </ContainerFlex>

                  <ActionButton background="#D9A327" type="button">
                    Aceitar
                  </ActionButton>
                  <ActionButton background="#D5D5D5" type="button">
                    Recusar
                  </ActionButton>
                </ScheduleRequest>
              </Slide>
            ))}
          </Slider>
          <ButtonBack>
            <MdKeyboardArrowLeft size={32} />
          </ButtonBack>
          <ButtonNext>
            <MdKeyboardArrowRight size={32} />
          </ButtonNext>
        </SliderContainer>
      </CarouselProvider>

      <ButtonContainer>
        <Button
          type="button"
          background="#292C2F"
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar Horário
        </Button>
      </ButtonContainer>

      <ScheduleContainer>
        {schedule &&
          schedule.scheduleDates &&
          schedule.scheduleDates.map(scheduleDate => (
            <ScheduleItem key={scheduleDate.id}>
              <ul>
                <li>
                  <b>Data: </b>
                  {toDate(scheduleDate.date)}
                </li>

                <li>
                  <b>Horário: </b>
                  {toTime(scheduleDate.date)}
                </li>

                <li>
                  <b>Status: </b>Disponível
                </li>
              </ul>

              <RemoveButton type="button">Remover</RemoveButton>
            </ScheduleItem>
          ))}
      </ScheduleContainer>
    </Container>
  );
};

export default Schedule;
