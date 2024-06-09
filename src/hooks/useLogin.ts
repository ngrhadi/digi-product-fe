import { LoginType } from '@/types/auth';
import { ResponseType } from '@/types/response';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';

export default function useLogin() {
  return useMutation<ResponseType, AxiosError, LoginType>({
    mutationFn: async (variables) => {
      const { email, password } = variables;

      const response = await signIn('credentials', {
        username: email,
        password: password,
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? '',
        redirect: false,
      }).then((response) => {
        if (response?.ok === true) {
          return { status: 1 };
        } else {
          return { status: 0 };
        }
      });

      return response;
    },
    onSuccess: () => {
      return true;
    },
    onError: () => {
      return false;
    },
  });
}
