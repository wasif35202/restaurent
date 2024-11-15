import NextAuth, { type DefaultSession } from 'next-auth';
import 'next-auth/jwt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/utils/utils';
import authConfig from './auth.config';

declare module 'next-auth' {
  interface Session {
    user: {
      isAdmin: boolean;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isAdmin: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  callbacks: {
    async jwt({ token }) {
      
      if (token.email) {
        const userInDb = await prisma.user.findUnique({
          where: { email: token.email },
        });
        token.isAdmin = userInDb?.isAdmin ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }

      return session;
    },
  },
});
