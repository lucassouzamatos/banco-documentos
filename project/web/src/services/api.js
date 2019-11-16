import axios from 'axios';

export const host = 'http://localhost:3333';

const api = axios.create({
  baseURL: `${host}/api/v1`,
});

export default api;
