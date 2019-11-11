import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';
import { HeaderArtist } from '~/ui';

const ArtistStudioLayout = ({ children }) => {
  return (
    <Wrapper>
      <HeaderArtist />
      {children}
    </Wrapper>
  );
};

ArtistStudioLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ArtistStudioLayout;
