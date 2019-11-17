import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StylesList = ({ artistStyles }) => (
  <StyleContainer>
    {artistStyles.map(artistStyle => (
      <StyleItem key={artistStyle.style.id}>
        {artistStyle.style.title}
      </StyleItem>
    ))}
  </StyleContainer>
);

const StyleItem = styled.li`
  background: #292c2f;
  border-radius: 16px;
  color: #fff;
  padding: 4px 16px;

  & + li {
    margin-left: 8px;
  }
`;

const StyleContainer = styled.ul`
  display: flex;
  padding-bottom: 16px;
`;

StylesList.propTypes = {
  artistStyles: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default StylesList;
