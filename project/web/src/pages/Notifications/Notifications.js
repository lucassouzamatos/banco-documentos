import React from 'react';
import { ActionButton, Container, Title } from '~/ui';
import { ButtonMarkRead, Header, Notification } from './styles';

const Schedule = () => {
  return (
    <Container>
      <Title>Notificações</Title>

      {[0, 1, 2, 3].map(index => (
        <Notification key={index}>
          <Header>
            <p>O estúdio Lorem ipsum adicionou uma nova arte ao seu perfil</p>
            <ButtonMarkRead type="button">Marcar como lida</ButtonMarkRead>
          </Header>
          <ActionButton background="#D9A327" type="button">
            Aceitar
          </ActionButton>
          <ActionButton background="#D5D5D5" type="button">
            Recusar
          </ActionButton>
        </Notification>
      ))}
    </Container>
  );
};

export default Schedule;
