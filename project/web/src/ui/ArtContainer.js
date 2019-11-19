import styled from 'styled-components';

const ArtContainer = styled.div`
  width: 275px;
  display: block;
  background: #fff;
  box-shadow: 10px 20px 30px rgba(117, 117, 117, 0.16);
  margin: 0 24px 24px 0;
  color: inherit;

  h3 {
    font-size: 19px;
    margin-bottom: 8px;
    font-weight: normal;
  }

  > div {
    background: #fff;
    padding: 16px;
  }

  img {
    width: 100%;
    height: 230px;
    object-fit: contain;
  }

  li {
    font-size: 14px;
  }
`;

export default ArtContainer;
