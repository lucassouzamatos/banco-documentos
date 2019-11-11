import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';
import { HeaderClient } from '~/ui';

const ClientLayout = ({ children }) => {
  return (
    <Wrapper>
      <HeaderClient />
      {children}
    </Wrapper>
  );
};

ClientLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ClientLayout;
