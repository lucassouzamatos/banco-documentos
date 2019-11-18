import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ActionButton, Container, Title } from '~/ui';
import { ButtonMarkRead, Header, Notification } from './styles';
import api from '~/services/api';

const Schedule = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const response = await api.get(`notifications`);

      setNotifications(response.data.data.notifications);
      console.log(response.data.data.notifications);
    };

    loadNotifications();
  }, []);

  const handleClickMarkAsRead = async notification => {
    try {
      await api.put(`notifications/${notification.id}`, {
        read: true,
      });

      setNotifications(
        notifications.map(n => {
          if (n.id === notification.id) {
            return {
              ...notification,
              read: true,
            };
          }

          return n;
        })
      );
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar a notificação');
    }
  };

  const handleAcceptNotification = async (notification, accepted) => {
    try {
      await api.put(`scheduleds/${notification.scheduled.id}`, {
        accepted,
      });

      toast.success(
        `Agendamento ${accepted ? 'aceito' : 'recusado'} com sucesso`
      );
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar o agendamento');
    }
  };

  return (
    <Container>
      <Title>Notificações</Title>

      {notifications.map(notification => (
        <Notification key={notification.id} read={notification.read}>
          <Header>
            <p>{notification.description}</p>
            {!notification.read && (
              <ButtonMarkRead
                type="button"
                onClick={() => handleClickMarkAsRead(notification)}
              >
                Marcar como lida
              </ButtonMarkRead>
            )}
          </Header>
          {notification.scheduled && notification.scheduled.accepted === null && (
            <>
              <ActionButton
                background="#D9A327"
                type="button"
                onClick={() => handleAcceptNotification(notification, true)}
              >
                Aceitar
              </ActionButton>
              <ActionButton
                background="#D5D5D5"
                type="button"
                onClick={() => handleAcceptNotification(notification, false)}
              >
                Recusar
              </ActionButton>
            </>
          )}
        </Notification>
      ))}
    </Container>
  );
};

export default Schedule;
