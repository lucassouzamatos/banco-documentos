import React from 'react';
import PropTypes from 'prop-types';
import { Input as UnformInput } from '@rocketseat/unform';
import styled from 'styled-components';

const Input = ({ id, type, required, label }) => {
  return (
    <Container>
      <UnformInput name={id} id={id} type={type} required={required} />
      <label htmlFor={id}>{label}</label>
    </Container>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

const Container = styled.div`
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;

  input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #9e9e9e;
    border-radius: 0;
    outline: none;
    height: 3rem;
    width: 100%;
    font-size: 16px;
    margin: 0 0 8px 0;
    padding: 0;
    box-shadow: none;
    box-sizing: content-box;
    transition: box-shadow 0.3s, border 0.3s, -webkit-box-shadow 0.3s;

    &:focus {
      border-bottom: 1px solid #2f2f2f;

      & + label {
        color: #2f2f2f;
      }
    }
  }

  label {
    color: #9e9e9e;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    cursor: text;
    transition: transform 0.2s ease-out, color 0.2s ease-out,
      -webkit-transform 0.2s ease-out;
    transform-origin: 0% 100%;
    text-align: initial;
    transform: translateY(-2px);
  }
`;

export default Input;
