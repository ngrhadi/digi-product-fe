'use client';

import { signOut } from 'next-auth/react';
import { Button, UnstyledButton } from '@mantine/core';
import Link from 'next/link';

export const ButtonHome = () => {
  return (
    <UnstyledButton className="p-2 w-fit min-w-40 text-center ">
      <Link href="/">DIGI-PRODUCT</Link>
    </UnstyledButton>
  );
};

export const LoginButton = () => {
  return (
    <Button variant="default" className="p-2 w-fit min-w-40 text-center">
      <Link href="/login">Sign in</Link>
    </Button>
  );
};

export const RegisterButton = () => {
  return (
    <Button
      variant="default"
      className="border border-white p-2 w-fit min-w-40 text-center hover:bg-white hover:text-zinc-900"
    >
      <Link href="/register">Register</Link>
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button
      variant="filled"
      className="border border-white p-2 w-fit min-w-40 text-center hover:bg-white hover:text-zinc-900"
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
};

export const ProfileButton = () => {
  return (
    <Button variant="default" className="p-2 w-fit min-w-40 text-center">
      <Link href="/profile">Profile</Link>
    </Button>
  );
};
