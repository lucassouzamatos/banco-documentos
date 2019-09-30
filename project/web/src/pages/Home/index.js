import React from 'react';

import { Container, ButtonContainer, Button } from './styles';

export default function Home() {
  return (
    <Container>
      <ButtonContainer>
        <Button to="#" background="#292C2F">
          Sou um cliente
        </Button>
        <Button to="/login" background="#D9A327">
          Sou um tatuador/estúdio
        </Button>
      </ButtonContainer>
    </Container>
  );
}
