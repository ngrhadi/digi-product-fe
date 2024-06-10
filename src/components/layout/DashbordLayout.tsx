'use client';
import Navbar from '@/components/layout/Navbar';
import { ButtonHome } from '@/components/ui/Button';
import useGetProduct, { ParamGetProduct } from '@/hooks/useGetProduct';
import { UseSessionResult } from '@/types/auth';
import {
  AppShell,
  Burger,
  Button,
  Group,
  NumberInput,
  Pagination,
  Skeleton,
  Text,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { ReactNode, useState } from 'react';

export default function DashbordLayout({
  children,
  session,
}: {
  children: ReactNode;
  session?: Session | null;
}) {
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

  const [activePage, setPage] = useState(1);
  const [params, setParams] = useState<ParamGetProduct>({});

  const {
    data: dataProduct,
    isLoading,
    error,
    refetch,
  } = useGetProduct(params);

  const handleFormSubmit = (submittedParams: ParamGetProduct) => {
    setParams(submittedParams);
    refetch();
  };

  const items =
    dataProduct && Array.isArray(dataProduct) ? (
      dataProduct.map((product) => (
        <Text key={product.id}>
          id: {product.id}, name: {product.product_name}
        </Text>
      ))
    ) : (
      <div>No data available</div>
    );

  return (
    <AppShell
      header={{ height: 60 }}
      bg={colorScheme === 'dark' ? 'gray' : 'cyan'}
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
              <Navbar isMobile={false} status={status} />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <ParamForm onSubmit={handleFormSubmit} />
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
        {isLoading && (
          <div>
            {Array(15)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} h={28} mt="sm" animate={false} />
              ))}
          </div>
        )}
        {error && <div>Error: {JSON.stringify(error ?? '')}</div>}
        <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3">
          {items}
        </div>
        {dataProduct && Array.isArray(dataProduct) && (
          <Pagination
            total={dataProduct.length}
            value={activePage}
            onChange={setPage}
            mt="sm"
          />
        )}
      </AppShell.Main>
    </AppShell>
  );
}

interface ParamFormProps {
  onSubmit: (params: ParamGetProduct) => void;
}

const ParamForm: React.FC<ParamFormProps> = ({ onSubmit }) => {
  const [params, setParams] = useState<ParamGetProduct>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(params);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <TextInput name="id" label="ID" onChange={handleChange} /> */}
      <TextInput
        name="product_name"
        label="Product Name"
        onChange={handleChange}
      />
      <TextInput name="category" label="Category" onChange={handleChange} />
      <TextInput name="location" label="Location" onChange={handleChange} />
      <TextInput name="quantity" label="Quantity" onChange={handleChange} />
      <TextInput
        name="total_selling"
        label="Total Selling"
        onChange={handleChange}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
