import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { updateProfileSuccess, updateProfileFailure } from './actions';
import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    const { data } = payload;
    const response = yield call(api.put, `users/${data.id}`, data);

    toast.success('Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data.data.user));
  } catch (err) {
    toast.error('Erro ao atualizar perfil');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
