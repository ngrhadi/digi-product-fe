import { API_URL } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

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
          console.log('handle error');
          const axiosError = error as AxiosError;

          // Check if the error response indicates the token is not valid
          const isTokenInvalid = JSON.stringify(
            axiosError?.response?.data
          ).includes('token_not_valid');

          console.log(isTokenInvalid, 'isTokenInvalid');

          if (isTokenInvalid && refresh) {
            try {
              console.log('handle error 2');
              const refreshResponse = await API_URL.post(
                '/api/token/refresh/',
                {
                  refresh: refresh,
                }
              );
              Cookies.set('token', refreshResponse.data.access);
              return true;
            } catch (refreshError) {
              console.log('handle error 3');
              console.error('Error refreshing token:', refreshError);
              Cookies.set('token', currentToken ?? '');
              return false;
            }
          } else {
            Cookies.set('token', currentToken ?? '');
            console.log('handle error 4');
            console.error('Token verification failed:', error);
            return false;
          }
        }
      },
    });

  if (currentToken && currentToken.length > 0) {
    // Execute the mutation
    mutation.mutate();
  }

  return { ...mutation };
}
