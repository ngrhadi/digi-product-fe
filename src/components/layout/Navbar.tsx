'use client';

import { useMantineColorScheme, ActionIcon } from '@mantine/core';
import { LoginButton, ProfileButton, RegisterButton } from '../ui/Button';
import { AuthenticatedSession } from '@/types/auth';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { API_URL } from '@/lib/api';
import { ResponseJWT } from '@/types/response';

export default function Navbar({
  isMobile,
  status,
}: {
  status: 'loading' | 'authenticated' | 'unauthenticated';
  isMobile: boolean;
}) {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const [name, setName] = useState<string>();

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then(async (data) => {
        setName(data.first_name);
      });
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="w-full flex justify-center flex-col h-auto p-2 items-center">
          {status === 'authenticated' ? (
            <div className="flex flex-col w-fit gap-4 items-center">
              <ProfileButton fullWidth={true} name={name ?? ''} />
              {colorScheme === 'dark' ? (
                <ActionIcon
                  variant="transparent"
                  aria-label="ligth"
                  onClick={() => setColorScheme('light')}
                >
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
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                </ActionIcon>
              ) : (
                <ActionIcon
                  variant="transparent"
                  aria-label="dark"
                  onClick={() => setColorScheme('dark')}
                >
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
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                </ActionIcon>
              )}
            </div>
          ) : (
            <div className="flex flex-col w-fit gap-4 items-center">
              <LoginButton fullWidth={true} />
              <RegisterButton fullWidth={true} />
              {colorScheme === 'dark' ? (
                <ActionIcon
                  variant="transparent"
                  onClick={() => setColorScheme('auto')}
                >
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
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                </ActionIcon>
              ) : (
                <ActionIcon
                  variant="transparent"
                  onClick={() => setColorScheme('dark')}
                >
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
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                </ActionIcon>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex justify-between h-auto p-2 items-center">
          {status === 'authenticated' ? (
            <div className="flex w-fit gap-4 items-center">
              <ProfileButton fullWidth={false} name={name ?? ''} />
              {colorScheme === 'dark' ? (
                <ActionIcon
                  variant="transparent"
                  aria-label="ligth"
                  onClick={() => setColorScheme('light')}
                >
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
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                </ActionIcon>
              ) : (
                <ActionIcon
                  variant="transparent"
                  aria-label="dark"
                  onClick={() => setColorScheme('dark')}
                >
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
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                </ActionIcon>
              )}
            </div>
          ) : (
            <div className="flex w-fit gap-4 items-center">
              <LoginButton fullWidth={false} />
              <RegisterButton fullWidth={false} />
              {colorScheme === 'dark' ? (
                <ActionIcon
                  variant="transparent"
                  onClick={() => setColorScheme('light')}
                >
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
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                </ActionIcon>
              ) : (
                <ActionIcon
                  variant="transparent"
                  onClick={() => setColorScheme('dark')}
                >
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
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                </ActionIcon>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
