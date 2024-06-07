'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createStore, Provider } from 'jotai';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

type Props = {
  children?: ReactNode;
  session: any;
};

export const queryClient = new QueryClient();
export const mainStore = createStore();

const NextAuthProvider = ({ children, session }: Props) => {
  return (
    <MantineProvider>
      <SessionProvider basePath={'/auth'} session={session}>
        <QueryClientProvider client={queryClient}>
          <Provider store={mainStore}>{children}</Provider>
        </QueryClientProvider>
      </SessionProvider>
    </MantineProvider>
  );
};

export default NextAuthProvider;
