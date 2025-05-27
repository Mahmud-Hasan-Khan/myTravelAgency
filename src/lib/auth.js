import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "./dbConnect";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        const { collection } = await dbConnect("users");
        const user = await collection.findOne({ email });

        if (!user) throw new Error("User not found");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        const { collection } = await dbConnect("users");
        const existingUser = await collection.findOne({ email });

        if (!existingUser) {
          const bangladeshTime = new Date(
            new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
          );

          await collection.insertOne({
            name,
            email,
            role: "user",
            provider: "google",
            createdAt: bangladeshTime,
          });
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const { collection } = await dbConnect("users");
        const dbUser = await collection.findOne({ email: user.email });

        token.role = dbUser?.role || "user";
      }

      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
