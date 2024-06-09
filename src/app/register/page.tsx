'use client';

import useRegister from '@/hooks/useRegistration';
import { RegisterType } from '@/types/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, PasswordInput } from '@mantine/core';
import AuthLayout from '@/components/layout/AuthLayout';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>();

  const { mutate } = useRegister();

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterType> = async (values) => {
    mutate(values, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  return (
    <AuthLayout>
      <form
        className="mt-8 w-full space-y-6 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
          <div className="flex w-full gap-2">
            <div className="w-full">
              <label
                htmlFor="first_name"
                className="not-sr-onlyp-2 rounded-t-md"
              >
                First Name
              </label>
              <Input
                id="first_name"
                {...register('first_name', { required: true })}
                type="text"
                autoComplete="current-name"
                required
                className="appearance-none relative block w-full  border border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-zinc-900 focus:border-zinc-900 focus:z-10 sm:text-sm"
                placeholder="First Name"
              />
              {errors.first_name && (
                <span className="text-red-500">First Name is required</span>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="last_name"
                className="not-sr-onlyp-2 rounded-t-md"
              >
                Last Name
              </label>
              <Input
                id="last_name"
                {...register('last_name', { required: true })}
                type="text"
                autoComplete="current-name"
                required
                className="appearance-none relative block w-full  border border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-zinc-900 focus:border-zinc-900 focus:z-10 sm:text-sm"
                placeholder="Last Name"
              />
              {errors.last_name && (
                <span className="text-red-500">Last Name is required</span>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="not-sr-onlyp-2 rounded-t-md">
              Email address
            </label>
            <Input
              id="email"
              {...register('email', { required: true })}
              type="email"
              autoComplete="email"
              required
              className="appearance-none relative block w-full  border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-zinc-900 focus:border-zinc-900 focus:z-10 sm:text-sm"
              placeholder="Email Address"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="not-sr-onlyp-2 rounded-t-md">
              Password
            </label>
            <PasswordInput
              id="password"
              {...register('password', { required: true })}
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none relative block w-full  border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-zinc-900 focus:border-zinc-900 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          <div>
            <label
              htmlFor="re_password"
              className="not-sr-onlyp-2 rounded-t-md"
            >
              Confirm Password
            </label>
            <PasswordInput
              id="re_password"
              {...register('re_password', { required: true })}
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none relative block w-full border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-zinc-900 focus:border-zinc-900 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
            />
            {errors.re_password && (
              <span className="text-red-500">Confirm Password is required</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            variant="default"
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-mediumhoverfocus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
          >
            Sign up
          </Button>
          <Link className="w-full text-center" href="/login">
            Already have account
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
