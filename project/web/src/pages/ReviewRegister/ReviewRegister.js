import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@rocketseat/unform';

import { toast } from 'react-toastify';
import api from '~/services/api';
import { RegisterContainer, FlexContainer } from './styles';
import { Button, Container, Input, Title } from '~/ui';
import history from '~/services/history';

const ReviewRegister = () => {
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  function handleSubmit(data) {
    async function createArt() {
      try {
        const formData = new FormData();
        Object.keys(data).forEach(item => {
          formData.append(item, data[item]);
        });

        formData.append('image', image);
        formData.append('type', 'REVIEW');
        formData.append('scheduled_id', id);
        await api.post(`reviews`, formData);

        toast.success('Avaliação cadastrada com sucesso!');
        history.push('/explore');
      } catch (error) {
        if (error.response.data.errors) {
          const errorsMessage = error.response.data.errors.reduce(
            (accumulator, errorMessage) => accumulator + errorMessage,
            ''
          );

          toast.error(errorsMessage);
          return;
        }

        toast.error('Erro ao cadastrar avaliação.');
      }
    }

    createArt();
  }

  function onChangeFile(e) {
    const [file] = e.target.files;

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  return (
    <Container>
      <div>
        <Title>Adicionar Avaliação</Title>
      </div>

      <RegisterContainer>
        <Form onSubmit={handleSubmit}>
          {imagePreview && <img src={imagePreview} alt="Tattoo" />}

          <input id="image" type="file" onChange={onChangeFile} />
          <Button background="#D9A327" htmlFor="image" as="label">
            Carregar
          </Button>

          <FlexContainer>
            <Input id="title" type="text" required label="Título" />
            <Input id="description" type="text" required label="Comentário" />
          </FlexContainer>

          <Button background="#292C2F" type="submit">
            Salvar
          </Button>
        </Form>
      </RegisterContainer>
    </Container>
  );
};

export default ReviewRegister;
