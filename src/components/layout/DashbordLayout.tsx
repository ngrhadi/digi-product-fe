'use client';
import Navbar from '@/components/layout/Navbar';
import { ButtonHome } from '@/components/ui/Button';
import useGetProduct, { ParamGetProduct } from '@/hooks/useGetProduct';
import { UseSessionResult } from '@/types/auth';
import {
  AppShell,
  Badge,
  Burger,
  Button,
  Card,
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
import Image from 'next/image';
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
  const itemsPerPage = 9;

  const [params, setParams] = useState<ParamGetProduct>({});

  const {
    data: dataProduct,
    isLoading,
    error,
    refetch,
  } = useGetProduct(params);

  const sortedProducts = Array.isArray(dataProduct)
    ? dataProduct?.sort((a, b) => a.product_name.localeCompare(b.product_name))
    : [];

  // sortedProducts.length' is possibly 'undefined
  const totalPages = Math.ceil(sortedProducts?.length / itemsPerPage);

  // Get the products to display for the current page
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts =
    sortedProducts !== undefined && sortedProducts.slice(startIndex, endIndex);

  const handleFormSubmit = (submittedParams: ParamGetProduct) => {
    setParams(submittedParams);
    refetch();
  };

  const items =
    paginatedProducts && Array.isArray(paginatedProducts) ? (
      paginatedProducts.map((product) => (
        <Card key={product.id} mx={2} my={2}>
          <Card.Section m={4}>
            <div className="flex h-[685px] w-full flex-col gap-4">
              {product.total_selling !== 1 && (
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full">
                  <div className="flex h-full w-full items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="rgb(220 38 38)"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="cyan"
                      className="size-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>
                  </div>
                </div>
              )}
              <Image
                src={product.image_url}
                alt={`img_` + product.id}
                width={300}
                height={300}
              />
              <div className="flex flex-col justify-between h-full">
                <h1 className="text-pretty flex-col">
                  <p className="font-semibold text-2xl">
                    {product.product_name}
                  </p>
                  <p className="line-clamp-5">{product.description}</p>
                </h1>
                <div className="flex flex-col gap-3 h-full justify-end">
                  <p className="italic font-medium">Price ${product.price}</p>
                  <p className="text-sm flex gap-4 items-center">
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
                        d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                      />
                    </svg>
                    {product.location} - {product.country}
                  </p>
                  {product.quantity === product.total_selling ? (
                    <>
                      <Badge bg="red">Empty Stock</Badge>
                    </>
                  ) : (
                    <>
                      <Badge bg="cyan">Ready Stock</Badge>
                    </>
                  )}
                  <div className="w-full text-right">
                    <Button
                      variant="fill"
                      bg={
                        product.quantity === product.total_selling
                          ? 'gray'
                          : 'black'
                      }
                      disabled={product.quantity === product.total_selling}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      Add to Chart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card.Section>
        </Card>
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
        <div className="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-3 grid-rows-3">
          {items}
        </div>
        {dataProduct && Array.isArray(dataProduct) && (
          <div className="flex justify-center items-center w-full">
            <Pagination
              total={totalPages}
              value={activePage}
              onChange={setPage}
              mt="sm"
            />
          </div>
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
