import LandingLayout from '@/components/layout/LandingLayout';
import { getServerSession } from 'next-auth';

export default async function Home() {
  return <LandingLayout>Main</LandingLayout>;
}
