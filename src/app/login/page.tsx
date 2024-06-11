'use client';
import AuthLayout from '@/components/layout/AuthLayout';
import useLogin from '@/hooks/useLogin';
import { Button, Checkbox, Input, PasswordInput } from '@mantine/core';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const { mutate } = useLogin();

  const onSubmit = async (values: any) => {
    await signIn('credentials', {
      username: values.email,
      password: values.password,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? '',
      redirect: false,
    })
      .then((response) => {
        console.log(response, 'response');
        return router.push('/dashboard');
      })
      .catch((error) => {
        return;
      });
    // mutate(values, {
    //   onSuccess: () => {
    //     router.push('/dashboard');
    //   },
    // });
  };

  return (
    <AuthLayout>
      <form className="mt-8 w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
          <div>
            <label
              htmlFor="email-address"
              className="not-sr-only p-2 rounded-t-md"
            >
              Email address
            </label>
            <Input
              id="email-address"
              {...register('email', { required: true })}
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full border border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-zinc-900 focus:border-zinc-900 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="not-sr-only p-2 rounded-t-md">
              Password
            </label>
            <PasswordInput
              id="password"
              {...register('password', { required: true })}
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-zinc-900 focus:border-zinc-900 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox
              id="remember-me"
              name="remember-me"
              type="checkbox"
              label="Remember me"
            />
          </div>

          <div className="text-sm">
            <a href="/forgot-password" className="font-medium">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            variant="default"
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
          >
            Sign in
          </Button>
          <Button
            variant="default"
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
            onClick={() => router.push('/register')}
          >
            Register
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
