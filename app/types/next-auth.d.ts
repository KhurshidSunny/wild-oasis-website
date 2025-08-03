declare module "next-auth" {
  // ✅ Extend the default Session type
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      guestId: string;
    };
  }
}
