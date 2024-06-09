'use client';

import Navbar from '@/components/layout/Navbar';
import { ButtonHome } from '@/components/ui/Button';
import { UseSessionResult } from '@/types/auth';
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSession } from 'next-auth/react';

export default function CollapseDesktop() {
  const { data } = useSession() as UseSessionResult;

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
      navbar={{
        width: 300,
        breakpoint: 'sm',
        // collapsed: { mobile: !opened, desktop: !opened },
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
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
              <Navbar session={data} isMobile={false} />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
