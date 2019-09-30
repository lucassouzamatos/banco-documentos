import React from 'react';

import { Container } from './styles';
import logo from '~/assets/logo.png';

export default function HeaderClient() {
  return (
    <Container>
      <img src={logo} alt="Inkin Logo" />
    </Container>
  );
}
