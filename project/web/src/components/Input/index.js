import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';

import { Container } from './styles';

export default function StyledInput({ id, type, required, label }) {
  return (
    <Container>
      <Input name={id} id={id} type={type} required={required} />
      <label htmlFor={id}>{label}</label>
    </Container>
  );
}

StyledInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};
