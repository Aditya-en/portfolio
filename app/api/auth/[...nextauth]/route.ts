// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not set");
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Check if password matches environment variable
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          // Return a user object if authenticated
          return { id: "1", name: "Admin" };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin", // Custom sign-in page
    error: "/admin", // Add this line
  },
  callbacks: {
    async jwt({ token }:{token:any}) {
      return token;
    },
    async session({ session }: {session : any}) {
      return session;
    },
    async redirect({ url, baseUrl }:{url:any, baseUrl:any}) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };