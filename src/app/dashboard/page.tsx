import DashbordLayout from '@/components/layout/DashbordLayout';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function CollapseDesktop() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/login');
  }
  return <DashbordLayout session={session}>Dashboard</DashbordLayout>;
}
