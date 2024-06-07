'use client';
import {
  ButtonHome,
  LoginButton,
  RegisterButton,
} from '@/components/ui/Button';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const route = useRouter();

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <main className="flex min-h-screen min-w-screen">
      <div className="w-full flex items-end justify-start  p-2 gap-2">
        DIGITAL PRODUCT @ 2024
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
      </div>
      <div className="w-full px-20 min-h-full flex justify-center items-center">
        <form
          className="mt-8 w-full space-y-6 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
            <div>
              <label
                htmlFor="email-address"
                className="not-sr-only p-2 rounded-t-md"
              >
                Email address
              </label>
              <input
                id="email-address"
                {...register('email', { required: true })}
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-zinc-900 focus:border-zinc-900 focus:z-10 sm:text-sm"
                placeholder="Email Address"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="not-sr-only p-2 rounded-t-md"
              >
                New Password
              </label>
              <input
                id="password"
                {...register('password', { required: true })}
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-zinc-900 focus:border-zinc-900 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              variant="default"
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
            >
              Reset Password
            </Button>
            <Link className="w-full text-center" href="/login">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
