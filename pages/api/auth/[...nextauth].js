import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

const adminEmails = ['jokejoy1337@gmail.com'];

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      }
      return false;
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(request, response) {
  const session = await getServerSession(request, response, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    response.status(401);
    response.end();
    throw new Error('not an admin');
  }
}
