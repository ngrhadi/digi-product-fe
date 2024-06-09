import { API_URL } from '@/lib/api';
import { RegisterType } from '@/types/auth';
import { ResponseType } from '@/types/response';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useRegister() {
  return useMutation<ResponseType, AxiosError, RegisterType>({
    mutationFn: async (variables) => {
      const payload = variables;

      const inputData = {
        ...payload,
        username: payload.email,
      };

      console.log(process.env.API_URL, 'API_URL');

      const response = await API_URL.post(`/api/register/`, inputData);
      return response.data?.data;
    },
    onSuccess: () => {
      return true;
    },
    onError: () => {
      return false;
    },
  });
}
