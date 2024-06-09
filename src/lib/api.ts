import axios from 'axios';
import getCookie from './getCookies';

export const API_URL = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'X-CSRFToken': getCookie('csrftoken'),
  },
});
