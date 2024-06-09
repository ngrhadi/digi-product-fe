import { Session } from 'next-auth';

export interface RegisterType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  re_password: string;
}

export interface LoginType {
  email: string;
  password: string;
}

type UserInfo = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};

export type AuthenticatedSession = {
  authenticated: boolean;
  session: {
    user: UserInfo;
    sub: string;
    id: number;
    accessToken: string;
    refreshToken: string;
    iat: number;
    exp: number;
    jti: string;
  };
};

type SessionData = {
  status: 'authenticated';
  data: AuthenticatedSession;
  update: (data?: any) => Promise<Session | null>;
};

type UnauthenticatedSession = {
  status: 'unauthenticated' | 'loading';
  data: null;
  update: (data?: any) => Promise<Session | null>;
};

export type UseSessionResult = SessionData | UnauthenticatedSession;
