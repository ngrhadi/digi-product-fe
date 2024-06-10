import { API_URL } from '@/lib/api';
import { listCurrentProduct, ProductInfo } from '@/store/products';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';

export type ParamGetProduct = {
  id?: string;
  product_name?: string;
  category?: string;
  location?: string;
  quantity?: string | number;
  total_selling?: string | number;
};

export default function useGetProduct(parameter: ParamGetProduct) {
  const [, setListData] = useAtom(listCurrentProduct);

  const { id, product_name, category, location, quantity, total_selling } =
    parameter;

  return useQuery<ProductInfo[], AxiosError>({
    queryKey: ['products'],
    queryFn: async (): Promise<ProductInfo[]> => {
      try {
        const queryParams = new URLSearchParams();

        if (id) queryParams.append('id', id);
        if (product_name) queryParams.append('product_name', product_name);
        if (category) queryParams.append('category', category);
        if (location) queryParams.append('location', location);
        if (quantity !== undefined)
          queryParams.append('quantity', quantity.toString());
        if (total_selling !== undefined)
          queryParams.append('total_selling', total_selling.toString());

        const queryString = queryParams.toString();

        const response = await API_URL.get(
          `/api/master_products/?${queryString}`,
          {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('token'),
            },
          }
        );

        const data: ProductInfo[] = await response.data;

        setListData(data);
        return data;
      } catch (error: AxiosError | any) {
        console.log(error, 'error');
        return error?.response?.data ?? 'Something Wrong';
      }
    },
  });
}
