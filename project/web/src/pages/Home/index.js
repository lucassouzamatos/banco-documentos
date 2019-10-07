import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { Container, ButtonContainer, LinkButton, Button } from './styles';
import { signInGoogleRequest } from '~/store/modules/auth/actions';

export default function Home() {
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
        <LinkButton to="/login" background="#D9A327">
          Sou um tatuador/estúdio
        </LinkButton>
      </ButtonContainer>
    </Container>
  );
}
