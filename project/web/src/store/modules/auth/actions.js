export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signUpRequest(
  username,
  email,
  cpf,
  cnpj,
  password,
  role,
  address,
  city_id
) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { username, email, cpf, cnpj, password, role, address, city_id },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
