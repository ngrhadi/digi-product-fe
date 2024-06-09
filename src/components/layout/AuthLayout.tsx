'use client';

import { SimpleGrid, useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import React from 'react';

type AuthLayoutProps = {
  children?: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const matches = useMediaQuery('(min-width: 56.25em)');

  return (
    <SimpleGrid
      style={{ height: '100vh' }}
      bg={colorScheme === 'dark' ? 'gray' : 'cyan'}
      cols={matches === true ? 2 : 1}
    >
      <div
        className={`${
          matches === true
            ? 'flex w-full items-end justify-start p-2 gap-2'
            : 'hidden'
        }`}
      >
        DIGITAL PRODUCT @ 2024
      </div>
      <div className="absolute top-10 left-10">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </Link>
      </div>
      <div className="w-full px-5 ls:px-20 min-h-full flex justify-center items-center">
        {children}
      </div>
    </SimpleGrid>
  );
}
