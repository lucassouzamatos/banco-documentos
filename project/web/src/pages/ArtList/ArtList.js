import React from 'react';
import { Link } from 'react-router-dom';

import { FlexContainer } from './styles';
import { ArtContainer, Button, Container, HeaderContainer, Title } from '~/ui';

const ArtList = () => {
  return (
    <Container>
      <HeaderContainer>
        <Title>Minhas artes</Title>
        <Button to="/arts/new" background="#D9A327" as={Link}>
          Adicionar
        </Button>
      </HeaderContainer>

      <FlexContainer>
        <ArtContainer>
          <img
            src="https://www.tattooja.com.br/img/blog/tatuagem-nos-dedos-saiba-tudo-que-precisa-ideias-inspiradoras-para-tattoo-topo-1720742430.jpg"
            alt="Tattoo"
          />
          <div>
            <h3>Lorem ipsum</h3>
            <ul>
              <li>15x20cm</li>
              <li>R$150,00</li>
            </ul>
          </div>
        </ArtContainer>
      </FlexContainer>
    </Container>
  );
};

export default ArtList;
