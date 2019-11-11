import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';

import { Container, ButtonContainer } from './styles';
import { Button } from '~/ui';
import { signInGoogleRequest } from '~/store/modules/auth/actions';

const Home = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <ButtonContainer>
        <GoogleLogin
          clientId="987341840104-akad5n2bv83oi3omgfakt76b965t46i3.apps.googleusercontent.com"
          render={renderProps => (
            <Button
              background="#292C2F"
              onClick={renderProps.onClick}
              type="button"
              disabled={renderProps.disabled}
            >
              Sou um cliente
            </Button>
          )}
          buttonText="Login"
          onSuccess={response => {
            const { profileObj } = response;
            dispatch(
              signInGoogleRequest(
                profileObj.email,
                profileObj.googleId,
                profileObj.name
              )
            );
          }}
        />
        <Button to="/login" background="#D9A327" as={Link}>
          Sou um tatuador/estúdio
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Home;
