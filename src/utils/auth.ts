//Ref: https://authjs.dev/getting-started/oauth-tutorial#creating-the-server-config

import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";

//The declare module statements extend the type definitions for NextAuth.js. It adds custom fields to the Session and JWT objects to include an isAdmin property.
declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: Boolean;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean;
  }
}

export const authoptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), //Ref: https://authjs.dev/reference/adapter/prisma
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string, //(or process.env.GITHUB_ID!)
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  /**
   * callbacks: Defines callback functions that customize the behavior of sessions and JWTs.
   * session: This callback sets the isAdmin property in the user's session based on the value in the JWT token.
   * jwt: This callback retrieves user information from the Prisma database and adds the isAdmin property to the JWT token.
   */
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      const userInDb = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });
      token.isAdmin = userInDb?.isAdmin as boolean;
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authoptions);
