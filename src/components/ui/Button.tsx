'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button, Divider, Menu, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const ButtonHome = () => {
  return (
    <UnstyledButton className="p-2 w-fit min-w-40 text-center ">
      <Link href="/">DIGI-PRODUCT</Link>
    </UnstyledButton>
  );
};

export const LoginButton = ({ fullWidth }: { fullWidth?: boolean }) => {
  return (
    <Button
      variant="default"
      style={{
        width: fullWidth ? '100%' : 'auto',
      }}
      fullWidth={fullWidth}
      className="p-2 text-center"
    >
      <Link href="/login">Sign in</Link>
    </Button>
  );
};

export const RegisterButton = ({ fullWidth }: { fullWidth?: boolean }) => {
  return (
    <Button
      variant="default"
      style={{
        width: fullWidth ? '100%' : 'auto',
      }}
      fullWidth={fullWidth}
      className="border border-white p-2 text-center hover:bg-white hover:text-zinc-900"
    >
      <Link href="/register">Register</Link>
    </Button>
  );
};

export const ProfileButton = ({
  fullWidth,
  name,
}: {
  fullWidth?: boolean;
  name: string;
}) => {
  const router = useRouter();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="default"
          style={{
            width: fullWidth ? '100%' : 'auto',
          }}
          fullWidth={fullWidth}
          className="p-2 text-center flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          {name}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Button
          fullWidth
          variant="default"
          onClick={() => router.push('/dashboard')}
        >
          Shop
        </Button>
        <Button
          fullWidth
          variant="default"
          onClick={() => router.push('/profile')}
        >
          Profile
        </Button>
        <Divider my="sm" />
        <Button
          fullWidth
          variant="fill"
          bg="cyan"
          onClick={() => {
            Cookies.remove('token');
            Cookies.remove('refresh');
            signOut();
          }}
        >
          Logout
        </Button>
      </Menu.Dropdown>
    </Menu>
  );
};
