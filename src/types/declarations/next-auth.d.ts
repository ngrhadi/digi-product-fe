import { DefaultSession, DefaultUser } from 'next-auth';
import { SessionContextValue } from 'next-auth/react';
import { UserInfo } from '../auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
    } & DefaultSession['user'];
  }
  // interface User extends DefaultUser {
  //   id: number;
  //   accessToken?: string;
  //   refreshToken?: string;
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
