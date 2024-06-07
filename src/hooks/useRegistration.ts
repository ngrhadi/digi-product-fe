import { API_URL } from '@/lib/api';
import { RegisterType } from '@/types/auth';
import { ResponseType } from '@/types/response';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useRegister() {
  return useMutation<ResponseType, AxiosError, RegisterType>({
    mutationFn: async (variables) => {
      const payload = variables;

      const response = await API_URL.post(`/api/register`, payload);
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
