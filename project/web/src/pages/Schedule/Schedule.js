import React, { useState } from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Modal from 'react-modal';
import { Form, Select } from '@rocketseat/unform';

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { ActionButton, Button, Container, Input, Title } from '~/ui';

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

Modal.setAppElement('#root');

const Schedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = data => {
    console.log(data);
  };

  const months = [
    { id: 1, title: 'Janeiro' },
    { id: 2, title: 'Feveiro' },
    { id: 3, title: 'Março' },
    { id: 4, title: 'Abril' },
    { id: 5, title: 'Maio' },
    { id: 6, title: 'Junho' },
    { id: 7, title: 'Julho' },
    { id: 8, title: 'Agosto' },
    { id: 9, title: 'Setembro' },
    { id: 10, title: 'Outubro' },
    { id: 11, title: 'Novembro' },
    { id: 12, title: 'Dezembro' },
  ];

  const days = [...Array(31).keys()].map(item => {
    return { id: item + 1, title: item + 1 };
  });

  return (
    <Container>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Adicionar Horário"
      >
        <h1>Adicionar horário</h1>
        <Form onSubmit={handleSubmit}>
          <Input id="title" type="time" required label="Horário" />
          <Select name="month" label="Mês" options={months} />
          <Select name="day" label="Dia" options={days} />

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
        {[0, 1, 2, 3].map(index => (
          <ScheduleItem key={index}>
            <ul>
              <li>
                <b>Data: </b>01/09/2019
              </li>

              <li>
                <b>Horário: </b>15:10
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
