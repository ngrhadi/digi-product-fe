import { getServerSession } from 'next-auth/next';

export async function GET(request: Request) {
  const session = await getServerSession();

  // if (!session) {
  //   return new Response(JSON.stringify({ error: 'Unauthorized' }), {
  //     status: 401,
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // }

  // if (!session.user) {
  //   return new Response(
  //     JSON.stringify({ error: 'User not found in session' }),
  //     {
  //       status: 404,
  //       headers: { 'Content-Type': 'application/json' },
  //     }
  //   );
  // }

  return new Response(JSON.stringify(session));
}
