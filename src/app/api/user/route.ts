import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';
import { API_URL } from '@/lib/api';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);

  Cookies.set('refresh', session?.refresh_token ?? '');
  const currentToken = Cookies.get('token') ?? session?.access_token;

  await API_URL.post('/api/token/verify/', {
    token: currentToken,
  })
    .then((response) => {
      return true;
    })
    .catch(async (error) => {
      if (error.response.data?.code === 'token_not_valid') {
        return await API_URL.post('/api/token/refresh/', {
          refresh: session?.refresh_token,
        }).then((response) => {
          Cookies.set('token', response.data.access);
        });
      } else {
        Cookies.set('token', currentToken ?? '');
      }
    });

  return NextResponse.json({
    ...(session?.user ?? null),
  });
}
