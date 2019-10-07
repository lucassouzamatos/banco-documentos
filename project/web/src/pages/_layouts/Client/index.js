import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';
import HeaderClient from '~/components/Header/Client';

export default function ClientLayout({ children }) {
  return (
    <Wrapper>
      <HeaderClient />
      {children}
    </Wrapper>
  );
}

ClientLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
