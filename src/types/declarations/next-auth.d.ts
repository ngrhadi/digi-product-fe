import { DefaultSession, DefaultUser } from 'next-auth';
import { SessionContextValue } from 'next-auth/react';
import { UserInfo } from '../auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultUser {
    access_token?: string;
    refresh_token?: string;
    user?:
      | {
        id: number | string;
      token: {
        access_token?: string;
        refresh_token?: string;
        },
          first_name: string;
          last_name: string;
          username: string;
          email: string;
        }
      | unknown;
  }
  // interface User  {
  //   id: number;

  //   user: {
  //     first_name: string;
  //     last_name: string;
  //     username: string;
  //     email: string;
  //   };
  // }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    token: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
