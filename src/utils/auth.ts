//Ref: https://authjs.dev/getting-started/oauth-tutorial#creating-the-server-config

import {NextAuthOptions, getServerSession} from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";

export const authoptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), //Ref: https://authjs.dev/reference/adapter/prisma
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string, //(or process.env.GITHUB_ID!)
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
};

export const getAuthSession =()=>getServerSession(authoptions)