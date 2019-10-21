import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@rocketseat/unform';

import { toast } from 'react-toastify';
import api from '~/services/api';
import {
  Container,
  RegisterContainer,
  FlexContainer,
  Subtitle,
} from './styles';
import { Title } from '~/components/Styled/Title';
import Input from '~/components/Input';

import { Button } from '~/components/Styled/Button';

export default function ArtRegister() {
  const { id } = useParams();

  const [artist, setArtist] = useState(null);
  const [image, setImage] = useState(null);

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
    setImage(file);
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
  }, []);

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
          <img
            src="https://www.tattooja.com.br/img/blog/tatuagem-nos-dedos-saiba-tudo-que-precisa-ideias-inspiradoras-para-tattoo-topo-1720742430.jpg"
            alt="Tattoo"
          />

          {/* <FileInput name="image" /> */}

          <input type="file" onChange={onChangeFile} />
          <Button background="#D9A327" type="button">
            Carregar
          </Button>

          <FlexContainer>
            <Input id="title" type="text" required label="Título" />
            <Input id="size" type="text" required label="Dimensões" />
          </FlexContainer>

          <FlexContainer>
            <Input id="description" type="text" required label="Descrição" />
            <Input id="price" type="text" required label="Preço" />

            {/* <div>
              <Select name="style" label="Estilo" options={styles} />
            </div> */}
          </FlexContainer>

          <Button background="#292C2F" type="submit">
            Salvar
          </Button>
        </Form>
      </RegisterContainer>
    </Container>
  );
}
