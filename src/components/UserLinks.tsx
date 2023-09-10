"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
  const { status } = useSession();
  return (
    <div>
      {status !== "authenticated" ? (
        <Link href="/login">Login</Link>
      ) : (
        <>
          <Link href="/orders">Orders</Link>
          <span className="ml-3" onClick={() => signOut()}>
            Logout
          </span>
        </>
      )}
    </div>
  );
};

export default UserLinks;
