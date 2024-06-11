import { API_URL } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function useValidateToken({
  refresh,
  access,
}: {
  refresh?: string;
  access?: string;
}) {
  Cookies.set('refresh', refresh ?? '');
  let currentToken;
  const tokenFromCookie = Cookies.get('token');
  // Object is possibly 'undefined'.
  if (tokenFromCookie && tokenFromCookie.length > 0) {
    currentToken = tokenFromCookie;
  } else {
    currentToken = access;
  }

  const mutation = useMutation<any, AxiosError>({
    mutationFn: async () => {
      try {
        await API_URL.post('/api/token/verify/', {
          token: currentToken,
        });

        Cookies.set('token', currentToken ?? '');

        // Token is valid
        return true;
      } catch (error) {
        const axiosError = error as AxiosError;

        // Check if the error response indicates the token is not valid
        const isTokenInvalid = JSON.stringify(
          axiosError?.response?.data
        ).includes('token_not_valid');

        if (isTokenInvalid && refresh) {
          try {
            const refreshResponse = await API_URL.post('/api/token/refresh/', {
              refresh: refresh,
            });
            Cookies.set('token', refreshResponse.data.access);
            return true;
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            Cookies.set('token', currentToken ?? '');
            return false;
          }
        } else {
          Cookies.set('token', currentToken ?? '');

          console.error('Token verification failed:', error);
          return false;
        }
      }
    },
  });

  useEffect(() => {
    if (currentToken && currentToken.length > 0) {
      // Execute the mutation
      mutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentToken]);

  return { ...mutation };
}
