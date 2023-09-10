"use client";

//Ref: https://authjs.dev/getting-started/oauth-tutorial#exposing-the-session-via-sessionprovider
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
