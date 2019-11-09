import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@rocketseat/unform';

import { toast } from 'react-toastify';
import api from '~/services/api';
import { Container, RegisterContainer, FlexContainer } from './styles';
import { Title } from '~/components/Styled/Title';
import Input from '~/components/Input';

import { Button, ButtonLabel } from '~/components/Styled/Button';

export default function ReviewRegister() {
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
        // await api.post(`arts`, formData);

        toast.success('Avaliação cadastrada com sucesso!');
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
          <ButtonLabel background="#D9A327" htmlFor="image">
            Carregar
          </ButtonLabel>

          <FlexContainer>
            <Input id="title" type="text" required label="Título" />
            <Input id="comment" type="text" required label="Comentário" />
          </FlexContainer>

          <Button background="#292C2F" type="submit">
            Salvar
          </Button>
        </Form>
      </RegisterContainer>
    </Container>
  );
}
