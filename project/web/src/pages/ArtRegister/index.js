import React from 'react';

import { Form, Select } from '@rocketseat/unform';
import {
  Container,
  HeaderContainer,
  RegisterContainer,
  FlexContainer,
} from './styles';
import { Title } from '~/components/Styled/Title';
import Input from '~/components/Input';

import { Button } from '~/components/Styled/Button';

const styles = [{ id: 1, title: 'Old school' }];

export default function ArtRegister() {
  return (
    <Container>
      <HeaderContainer>
        <Title>Adicionar Arte</Title>
      </HeaderContainer>

      <RegisterContainer>
        <img
          src="https://www.tattooja.com.br/img/blog/tatuagem-nos-dedos-saiba-tudo-que-precisa-ideias-inspiradoras-para-tattoo-topo-1720742430.jpg"
          alt="Tattoo"
        />

        <Button background="#D9A327" type="button">
          Carregar
        </Button>

        <Form>
          <FlexContainer>
            <Input id="title" type="text" required label="Título" />
            <Input id="size" type="text" required label="Dimensões" />
          </FlexContainer>

          <FlexContainer>
            <Input id="description" type="text" required label="Descrição" />
            <div>
              <Select name="style" label="Estilo" options={styles} />
            </div>
          </FlexContainer>

          <Button background="#292C2F" type="submit">
            Salvar
          </Button>
        </Form>
      </RegisterContainer>
    </Container>
  );
}
