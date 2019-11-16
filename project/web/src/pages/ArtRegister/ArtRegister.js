import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Select } from '@rocketseat/unform';

import { toast } from 'react-toastify';
import api from '~/services/api';
import { RegisterContainer, FlexContainer, Subtitle } from './styles';
import { Button, Container, Input, Title } from '~/ui';
import history from '~/services/history';
import { useProfile } from '~/hooks';
import defaultImage from '~/assets/default.jpg';

const ArtRegister = () => {
  const { id } = useParams();

  const profile = useProfile();
  const [styles, setStyles] = useState([]);
  const [artist, setArtist] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultImage);

  function handleSubmit(data) {
    async function createArt() {
      try {
        const formData = new FormData();
        Object.keys(data).forEach(item => {
          formData.append(item, data[item]);
        });

        formData.append('image', image);
        formData.append('type', 'ARTIST_ART');
        await api.post(`arts`, formData);

        toast.success('Arte cadastrada com sucesso!');
        history.push('/arts');
      } catch (error) {
        if (error.response.data.errors) {
          const errorsMessage = error.response.data.errors.reduce(
            (accumulator, errorMessage) => accumulator + errorMessage,
            ''
          );

          toast.error(errorsMessage);
          return;
        }

        toast.error('Erro ao cadastrar arte.');
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

  useEffect(() => {
    function getArtist(artistId) {
      async function getUser() {
        const response = await api.get(`users/${artistId}`);
        setArtist(response.data.data.user);
      }

      getUser();
    }

    if (id) {
      getArtist(id);
    }
  }, [id]);

  useEffect(() => {
    const loadStyles = async () => {
      const response = await api.get(`artist-styles?user_id=${profile.id}`);

      setStyles(
        response.data.data.artistStyles.map(artistStyle => artistStyle.style)
      );
    };

    loadStyles();
  }, [profile.id]);

  return (
    <Container>
      <div>
        <Title>Adicionar Arte</Title>
        {id && artist && (
          <Subtitle>Adicionando arte para {artist.username}</Subtitle>
        )}
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
            <Input id="dimensions" type="text" required label="Dimensões" />
          </FlexContainer>

          <FlexContainer>
            <Input id="description" type="text" required label="Descrição" />
            <Input id="price" type="text" required label="Preço" />
          </FlexContainer>

          <FlexContainer>
            <Input
              id="duration"
              type="text"
              required
              label="Tempo estimado para realização"
            />
            <div>
              <Select name="style_id" label="Estilo" options={styles} />
            </div>
          </FlexContainer>

          <Button background="#292C2F" type="submit">
            Salvar
          </Button>
        </Form>
      </RegisterContainer>
    </Container>
  );
};

export default ArtRegister;
