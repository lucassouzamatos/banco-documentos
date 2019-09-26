import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function ArtistStudioLayout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

ArtistStudioLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
