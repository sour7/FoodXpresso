/**
 * *https://authjs.dev/getting-started/oauth-tutorial
 *   Ref: https://next-auth.js.org/configuration/initialization
 */

import { authoptions } from "@/utils/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };
