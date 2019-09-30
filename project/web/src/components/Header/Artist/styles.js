import styled from 'styled-components';

export const Container = styled.div`
  background: #292c2f;
  height: 100vh;
  width: 230px;

  nav {
    padding-top: 16px;
  }

  a {
    font-family: Tahoma, sans-serif;
    color: #95989a;
    display: block;
    padding: 12px;
    transition: all 0.25s;
    display: flex;
    align-items: center;

    &:hover {
      background: #d9a327;
      color: #fff;
    }

    svg {
      margin-right: 8px;
    }
  }
`;
