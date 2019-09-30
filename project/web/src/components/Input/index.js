import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Input({ id, type, required, label }) {
  return (
    <Container>
      <input id={id} type={type} required={required} />
      <label htmlFor={id}>{label}</label>
    </Container>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};
