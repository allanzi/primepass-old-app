import axios from 'axios';
import { API_HOST, INTEGRATION_API } from '@env';

const api = axios.create({
  baseURL: API_HOST,
  headers: {
    'user-locale': 'pt_BR',
  },
});

export const apiIntegration = axios.create({
  baseURL: INTEGRATION_API,
  headers: {
    'user-locale': 'pt_BR',
  },
});

export default api;
