'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createStore, Provider } from 'jotai';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { Session } from 'next-auth';
import { usePathname, useRouter } from 'next/navigation';
import AuthWrapper from '@/components/AuthWrapper';
import useValidateToken from '@/hooks/useValidateToken';

type Props = {
  children?: ReactNode;
  session?: Session | null;
};

const theme = createTheme({
  // fontFamily: 'Open Sans, sans-serif',
  colors: {
    // Add your color
    deepBlue: [
      '#eef3ff',
      '#dce4f5',
      '#b9c7e2',
      '#94a8d0',
      '#748dc1',
      '#5f7cb8',
      '#5474b4',
      '#44639f',
      '#39588f',
      '#2d4b81',
    ],
    // or replace default theme color
    blue: [
      '#eef3ff',
      '#dee2f2',
      '#bdc2de',
      '#98a0ca',
      '#7a84ba',
      '#6672b0',
      '#5c68ac',
      '#4c5897',
      '#424e88',
      '#364379',
    ],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },
});

export const queryClient = new QueryClient();
export const mainStore = createStore();

const NextAuthProvider = ({ children, session }: Props) => {
  return (
    <MantineProvider theme={theme}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Provider store={mainStore}>
            <AuthWrapper>{children}</AuthWrapper>
          </Provider>
        </QueryClientProvider>
      </SessionProvider>
    </MantineProvider>
  );
};

export default NextAuthProvider;
