'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export const unauthedPaths = new Set(['/', '/login', '/register']);
export const forAuthedPaths = new Set(['unauthenticated', 'loading']);

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const session = useSession();
  const pathURL = usePathname();
  const router = useRouter();

  const pathName = pathURL;

  const noCheck = unauthedPaths.has(pathName);

  useEffect(() => {
    if (noCheck) {
      return;
    }

    setTimeout(() => {
      if (session.status !== 'authenticated') {
        router.push('/login');
      } else {
        router.push('/dashboard');
      }
    }, 400);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noCheck, router, session.status]);
  return <div>{children}</div>;
}
