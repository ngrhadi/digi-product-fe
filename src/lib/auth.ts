import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

type ApiResponse = {
  id: any;
  access_token: string;
  refresh_token: string;
  user: {
    id: any;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
  };
};

type User = {
  id: any;
  accessToken: string;
  refreshToken: string;
  user: {
    id: any;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
  };
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return await axios
          .post<ApiResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`,
            {
              username: credentials?.username,
              password: credentials?.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then((result) => {
            const user = result.data;

            // Handle potential missing properties from the API response gracefully
            const response: User = {
              id: user.id || null,
              accessToken: user.access_token,
              refreshToken: user.refresh_token,
              user: {
                id: user.user?.id || null,
                first_name: user.user?.first_name || '',
                last_name: user.user?.last_name || '',
                username: user.user?.username || '',
                email: user.user?.email || '',
              },
            };

            return response;
          })
          .catch((err) => {
            console.log(err);
            return null;
          });
      },
    }),
  ],
  callbacks: {
    // jwt({ token, user }) {
    //   return { ...token, user };
    // },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token, user }) {
      return { ...session, ...token, ...user };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: '/auth/signin',
  //   // error: '/auth/error',
  // },
};
