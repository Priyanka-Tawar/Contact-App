export const API_BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`
  },
  USER: {
    ME: `${API_BASE_URL}/users/me`
  },
  CONTACTS: `${API_BASE_URL}/contacts`
};

export const TOKEN_KEY = 'auth-token';
export const USER_KEY = 'auth-user';
