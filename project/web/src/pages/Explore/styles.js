import styled from 'styled-components';

export const ArtsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  height: max-content;
  padding: 16px;
`;

export const LikeButton = styled.button`
  padding: 16px 0;
  background: none;
  border: none;
  display: flex;

  svg {
    margin-right: 8px;
  }
`;
