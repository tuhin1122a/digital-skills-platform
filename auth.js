import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        console.log("Response status:", res.status);
        const data = await res.json();
        console.log("Login response:", data);

        if (!res.ok) {
          console.log("Login failed:", data.message);
          throw new Error(data.message || "Login failed");
        }

        const user = data.data.user;

        return {
          id: user.id,
          name: user.name,                  // এখানে direct name নেওয়া হলো
          email: user.email,
          image: user.avatarUrl || null,    // avatarUrl যদি না থাকে তাহলে null
          role: user.role,
          accessToken: data.data.token,     // token থেকে accessToken নেওয়া হচ্ছে
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
        token.accessToken = user.accessToken || null;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image,
          role: token.role,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
