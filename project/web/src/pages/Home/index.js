import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Container, ButtonContainer, Button } from './styles';

export default function Home() {
  return (
    <Container>
      <GoogleLogin
        clientId="987341840104-akad5n2bv83oi3omgfakt76b965t46i3.apps.googleusercontent.com"
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
        )}
        buttonText="Login"
        onSuccess={(response) => console.log(response)}
        onFailure={(response) => console.log(response)}
      />
      <ButtonContainer>
        <Button to="#" background="#292C2F">
          Sou um cliente
        </Button>
        <Button to="/login" background="#D9A327">
          Sou um tatuador/estúdio
        </Button>
      </ButtonContainer>
    </Container>
  );
}
