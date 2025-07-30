import nextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // credentialProvicer // for email and password login
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },

    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getGuest(user.email);
        console.log(existingUser);

        if (!existingUser)
          await createGuest({
            email: user.email,
            fullName: user.name,
          });

        // if everything goes well
        return true;
      } catch {
        return false;
      }
    },

    // adding guest id to the session
    async session({ session }) {
      const guest = await getGuest(session?.user.email);
      session.user.guestId = guest._id;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = nextAuth(authConfig);
