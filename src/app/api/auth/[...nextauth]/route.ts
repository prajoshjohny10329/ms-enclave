import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login", // redirect to custom login page
  },

  callbacks: {
    // When user signs in
    async signIn({ user }) {
      await connectDB();
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
        });
      }

      return true;
    },

    // When session is created
    async session({ session }) {
      if (!session.user?.email) return session; // 🧩 safety check
      await connectDB();

      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser && session.user) {
        session.user.id = dbUser._id.toString();
        session.user.phone = dbUser.phone || "";
        session.user.nationality = dbUser.nationality || "";
        session.user.address = dbUser.address || "";
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
