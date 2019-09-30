import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';
import HeaderArtist from '~/components/Header/Artist';

export default function ArtistStudioLayout({ children }) {
  return (
    <Wrapper>
      <HeaderArtist />
      {children}
    </Wrapper>
  );
}

ArtistStudioLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
