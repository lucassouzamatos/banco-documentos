import styled from 'styled-components';

export const Container = styled.div`
  width: 400px;
  margin: 0 auto;

  a {
    margin-bottom: 8px;
  }

  img {
    width: 220px;
    height: 220px;
    display: block;
    object-fit: cover;
    margin: 16px auto;
    border-radius: 50%;
  }
`;

export const StyleItem = styled.li`
  background: #292c2f;
  border-radius: 16px;
  color: #fff;
  padding: 4px 16px;

  & + li {
    margin-left: 8px;
  }
`;

export const StyleContainer = styled.ul`
  display: flex;
  padding-bottom: 16px;
`;

export const H3 = styled.h3`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: normal;
`;
