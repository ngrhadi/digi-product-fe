'use client';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
import Navbar from '@/components/layout/Navbar';
import { ButtonHome } from '@/components/ui/Button';
import { UseSessionResult } from '@/types/auth';
import {
  AppShell,
  Burger,
  Group,
  Skeleton,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';

type LandingProps = {
  children: React.ReactNode;
};

export default function LandingLayout({ children }: LandingProps) {
  const { data, status } = useSession();
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const [mobileOpened, mobileHandlers] = useDisclosure(false, {
    onOpen: () => console.log('Opened'),
    onClose: () => console.log('Closed'),
  });

  const [desktopOpened, desktopHandlers] = useDisclosure(true, {
    onOpen: () => console.log('Opened'),
    onClose: () => console.log('Closed'),
  });

  return (
    <AppShell
      header={{ height: 60 }}
      bg={colorScheme === 'dark' ? 'gray' : 'cyan'}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        // collapsed: { mobile: !opened, desktop: !opened },
        collapsed: { mobile: !mobileOpened, desktop: desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={mobileHandlers.toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Group justify="space-between" style={{ flex: 1 }}>
            <ButtonHome />
            <Group ml="xl" gap={0} visibleFrom="sm">
              <Navbar isMobile={false} status={status} />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar isMobile={true} status={status} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
