import React from 'react';

import { HeaderContainer, Container, FlexContainer } from './styles';
import { Title } from '~/components/Styled/Title';
import { LinkButton } from '~/components/Styled/Button';
import { ArtContainer } from '~/components/Styled/Art';

export default function ArtList() {
  return (
    <Container>
      <HeaderContainer>
        <Title>Minhas artes</Title>
        <LinkButton to="/arts/new" background="#D9A327">
          Adicionar
        </LinkButton>
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
}
