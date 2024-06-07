import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/layout/Navbar';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen min-w-screen flex-col">
      <div className="fixed top-0 w-full">
        <Navbar session={session} />
      </div>
      <div className="w-screen h-screen pt-20">
        <div className="flex lg:flex-row flex-col w-full h-full gap-4 p-10">
          <div className="basis-1/2 shadow-md">01</div>
          <div className="flex flex-col w-full h-full gap-4">
            <div className="basis-2/4 shadow-md">02</div>
            <div className="basis-2/4 shadow-md">03</div>
          </div>
        </div>
      </div>
    </main>
  );
}
