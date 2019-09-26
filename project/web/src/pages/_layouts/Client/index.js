import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function ClientLayout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

ClientLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
