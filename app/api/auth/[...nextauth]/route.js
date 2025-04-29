import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const users = [
          { id: 1, name: 'Admin', email: 'admin@example.com', password: 'adminpass', role: 'admin' },
          { id: 2, name: 'Manager', email: 'manager@example.com', password: 'managerpass', role: 'manager' },
          { id: 3, name: 'Team Member', email: 'team@example.com', password: 'teampass', role: 'member' },
        ];

        const user = users.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        return user || null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token?.role) session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
