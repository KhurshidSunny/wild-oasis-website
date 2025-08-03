import { type Session } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
import NextAuth from "next-auth";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // credentialProvicer // for email and password login
  ],
  callbacks: {
    authorized({ auth }: { auth: Session | null }) {
      // authorized({ auth, request }) {
      return !!auth?.user;
    },

    async signIn({
      user,
    }: {
      user: { name?: string | null; email?: string | null };
    }) {
      // async signIn({ user, account, profile }) {
      try {
        const existingUser = await getGuest(user.email as string);
        console.log(existingUser);

        if (!existingUser)
          await createGuest({
            email: user.email as string,
            fullName: user.name as string,
          });

        // if everything goes well
        return true;
      } catch {
        return false;
      }
    },

    // adding guest id to the session
    async session({ session }: { session: Session }) {
      const guest = await getGuest(session?.user.email as string);
      session.user.guestId = guest._id;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

// @ts-expect-error NextAuth default export is callable at runtime
const { auth, signIn, signOut, handlers } = NextAuth(authConfig);

export const { GET, POST } = handlers;
export { auth, signIn, signOut };
