'use client';
import LandingLayout from '@/components/layout/LandingLayout';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default function Home() {
  return <LandingLayout>Main</LandingLayout>;
}
