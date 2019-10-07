import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'auth', {
      email,
      password,
    });

    const { token, user } = response.data.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/profile');
  } catch (err) {
    toast.error('Falha na autenticação, verifique suas credenciais.');
    yield put(signFailure());
  }
}

export function* signInGoogle({ payload }) {
  try {
    const { email, googleId, name } = payload;

    const response = yield call(api.post, 'auth/google', {
      email,
      googleId,
      name,
    });

    const { token, user } = response.data.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/profile');
  } catch (err) {
    toast.error('Falha na autenticação, verifique suas credenciais.');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const {
      username,
      email,
      cpf,
      cnpj,
      password,
      role,
      address,
      city_id,
    } = payload;

    yield call(api.post, 'users', {
      username,
      email,
      cpf,
      cnpj,
      password,
      role,
      address,
      city_id,
    });

    history.push('/login');
  } catch (err) {
    toast.error('Falha no cadastro. Verifique seus dados');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_IN_GOOGLE_REQUEST', signInGoogle),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
